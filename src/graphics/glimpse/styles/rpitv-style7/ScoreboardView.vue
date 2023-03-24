<template>
	<div id="containerScoreboardView" :class="'scoreboard ' + (replicants.scoreboard.visible.value ? '' : 'hidden')">
		<Transition name="animation-global">
			<div v-if="replicants.announcements.global.value.length !== 0" id="announcementGlobalRow">
				{{ announcementGlobalMsg }}
			</div>
		</Transition>
		<div id="bannerScore">
			<span :class="tga_enabled ? 'tga-visible' : 'tga-hidden'">{{ tga_school_name }} GOAL</span>
		</div>
		<div id="mainScoreboardView">
			<n-grid id="clockRow" cols="3">
				<n-grid-item id="clockRowLogo">
					<img :src="RPITVLogo" alt="RPI TV Logo" id="clockLogo">
				</n-grid-item>
				<n-grid-item id="clockRowTime">
					<span id="clockClock" :class="clock.time.value < 10000 ? 'low-time' : ''">
						{{ formattedClockTime }}
					</span>
				</n-grid-item>
				<n-grid-item id="clockRowPeriod">
					<span id="clockPeriod">{{ formattedPeriod }}</span>
				</n-grid-item>
			</n-grid>
			<div id="teamRow">
				<TeamView :team-id="1" :text-color="teamLeftTextColor" id="teamLeft"/>
				<TeamView :team-id="0" :text-color="teamRightTextColor" id="teamRight"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../../../browser-common/replicants";
import RPITVLogo from "../../../../assets/rpitv-modern/rpitv_logo.svg";
import TeamView from "./TeamView.vue";
import {computed, onMounted, ref, watch} from "vue";
import {NGrid, NGridItem} from "naive-ui";

const replicants = await loadReplicants();
const clock = replicants.scoreboard.clock;
const period = replicants.scoreboard.period;

const teamLeftTextColor = computed(() => pickTextColorBasedOnBgColorSimple(replicants.teams[1].primaryColor.value, '#ffffff', '#000000'));
const teamRightTextColor = computed(() => pickTextColorBasedOnBgColorSimple(replicants.teams[0].primaryColor.value, '#ffffff', '#000000'));

const elmClockRow = ref<HTMLDivElement | null>();
const elmClockHeight = ref<string>("3.08vh");
const elmLeftTeamViewContainer = ref<Element | null>();
const elmRightTeamViewContainer = ref<Element | null>();
const elmTeamViewContainerHeight = ref<string>("2.8vh");
onMounted(() => {
	if (elmClockRow.value)
		elmClockHeight.value = elmClockRow.value.offsetHeight + "px";
	elmLeftTeamViewContainer.value = document.querySelector("#teamLeft .containerTeamView");
	elmRightTeamViewContainer.value = document.querySelector("#teamRight .containerTeamView");
	if (elmLeftTeamViewContainer.value && elmRightTeamViewContainer.value) {
		// todo fix ts typing here
		// @ts-ignore
		elmTeamViewContainerHeight.value = Math.max(elmLeftTeamViewContainer.value.offsetHeight, elmRightTeamViewContainer.value.offsetHeight) + "px";
	}
});


const announcementGlobalMsg = computed<string>(() => {
	const g = replicants.announcements.global.value;
	if (g.length === 0)
		return "";
	return g[0].message;
});

const timeRef = ref<string>("00:00");
const formattedClockTime = computed<string>(() => {
	// zero pads '1' to '01' for alignment
	const zeroPad = (n: string) => {
		// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
		return timeRef.value = n.padStart(2, "0");
	};
	const minutes = Math.floor(clock.time.value / 60000).toString();
	const seconds = Math.floor((clock.time.value % 60000) / 1000).toString();
	const millis = Math.floor((clock.time.value % 1000) / 100).toString();
	if (minutes === "0") {
		// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
		return timeRef.value = `${zeroPad(seconds)}.${millis.padEnd(2, "0")}`;
	} else {
		return timeRef.value = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
	}
});

const formattedPeriod = computed<string>(() => {
	if (period.value > replicants.gameSettings.periods.count.value) {
		const overtimePeriod = period.value - replicants.gameSettings.periods.count.value;
		if (overtimePeriod === 1) {
			return "OT\x00";
		} else {
			return `OT${overtimePeriod}`;
		}
	}

	if (period.value === undefined) {
		return "1st";
	}

	// Teens for some reason all end in "th" in English.
	if (period.value > 10 && period.value < 20) {
		return period.value + "th";
	}

	// For all other numbers, we need to figure out the suffix.
	const lastNumberOfPeriod = period.value % 10;
	if (lastNumberOfPeriod === 1) {
		return `${period.value}st`;
	} else if (lastNumberOfPeriod === 2) {
		return `${period.value}nd`;
	} else if (lastNumberOfPeriod === 3) {
		return `${period.value}rd`;
	} else {
		return `${period.value}th`;
	}
});

/*
Used to calculate whether white or black text should appear on announcements
Source: https://stackoverflow.com/a/41491220/4698546
 */
function pickTextColorBasedOnBgColorSimple(bgColor: string, lightColor: string, darkColor: string) {
	const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
	const r = parseInt(color.substring(0, 2), 16); // hexToR
	const g = parseInt(color.substring(2, 4), 16); // hexToG
	const b = parseInt(color.substring(4, 6), 16); // hexToB
	return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColor : lightColor;
}

const tga_color_primary = ref<string>("#dc0016");
const tga_color_secondary = ref<string>("#ffffff");
const tga_school_name = ref<string>("");
const tga_enabled = ref<boolean>(false);

/**
 * Updates the ref values based on the team that scored.
 *
 * @param team either team 0 or team 1
 */
function triggerGoalAnimation(team: 0 | 1) {
	tga_color_primary.value = replicants.teams[team].primaryColor.value;
	tga_color_secondary.value = replicants.teams[team].secondaryColor.value;
	tga_school_name.value = replicants.teams[team].name.value.toUpperCase();
	tga_enabled.value = true;

	// note this timeout should be twice css animation duration in "#bannerScore .tga-visible"
	setTimeout(() => {
		tga_enabled.value = false;
	}, 8000);
}

// wait for goal, then trigger animation
watch([replicants.teams[0].score, replicants.teams[1].score], (newValue, oldValue) => {
	console.log(oldValue)
	console.log(newValue)
	if (oldValue[0] < newValue[0]) { // is goal from team 0
		triggerGoalAnimation(0);
	} else if (oldValue[1] < newValue[1]) { // is goal from team 1
		triggerGoalAnimation(1);
	}
});
</script>

<style scoped lang="scss">
@use "sass:math";

$announcement-font-size: 1.6vh;
$padding-var: 0.1vh;
$scoreboard-width: 18vw;
$main-pos-left: 4vw;
$main-pos-top: 4vh;
$clock-font-size: 2.8vh;
$announcement-global-color: rgb(91, 79, 14);
$announcement-global-bg: rgb(240, 224, 88);
$clock-row-bg: rgb(27, 25, 25);
$clock-row-color: white;
$clock-zero-red: #862f28;

.hidden {
	opacity: 0;
}

#containerScoreboardView {
	font-family: "Open Sans", sans-serif;
	font-weight: bold;
	transition: opacity 1s;
}

#bannerScore {
	position: absolute;
	z-index: 3;
	left: $main-pos-left;
	top: calc($main-pos-top + v-bind(elmClockHeight) + 6 * $padding-var);
	width: $scoreboard-width;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.tga-hidden {
		opacity: 0;
	}

	.tga-visible {
		width: $scoreboard-width;
		text-align: center;
		font-size: $clock-font-size;
		height: calc(v-bind(elmTeamViewContainerHeight) - 4 * $padding-var);
		background: linear-gradient(to right, v-bind(tga_color_secondary), v-bind(tga_color_primary), v-bind(tga_color_secondary));
		color: white;
		animation: expand_center 4s ease-out 2 alternate;
		animation-fill-mode: forwards;
		opacity: 1;
	}

	// element swipes into view from center
	@keyframes expand_center {
		0% {
			clip-path: polygon(50% 100%, 50% 0, 50% 0, 50% 100%);
			-webkit-clip-path: polygon(50% 100%, 50% 0, 50% 0, 50% 100%);
		}
		25%, 100% {
			clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%);
			-webkit-clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%);
		}
	}
}

#mainScoreboardView {
	width: $scoreboard-width;
	left: $main-pos-left;
	top: $main-pos-top;
	position: absolute;
	z-index: 1;

	#clockClock {
		&.low-time {
			color: rgb(255, 175, 175);
			font-weight: bold;
		}
	}
}

#announcementGlobalRow {
	text-align: center;
	color: $announcement-global-color;
	background-color: $announcement-global-bg;
	left: $main-pos-left + $scoreboard-width;
	top: calc(1px + $main-pos-top);
	height: v-bind(elmClockHeight) - 1px;
	padding: $padding-var calc($padding-var);
	border-top: 1px;
	position: absolute;
	z-index: 1;
	font-size: $clock-font-size;
	font-weight: bold;
}

#clockRow {
	font-size: $clock-font-size;
	color: $clock-row-color;
	background: linear-gradient(180deg, #625858, #0d0505, #625858);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
	align-content: center;
	position: relative;

	#clockLogo {
		height: (1.1 * $clock-font-size);
		width: auto;
		position: absolute;
		transform: translateY(-50%);
	}

	// when clock is 00.00 flash change the bg color
	&.clockZero {
		animation: animation-clock-zero-start 2s 1 ease-in,
		animation-clock-zero 1s 9 2s alternate ease-in-out forwards;
	}

	@keyframes animation-clock-zero-start {
		0% {
			background-color: $clock-row-bg;
		}

		30%, 100% {
			background-color: $clock-zero-red;
		}
	}

	@keyframes animation-clock-zero {
		from {
			background: linear-gradient(180deg, #e74a4a, #a23939, #e74a4a);
		}

		to {
			background: linear-gradient(180deg, #625858, #0d0505, #625858);
		}
	}
}

#teamRow {
	justify-content: space-evenly;
	text-align: center;

	#teamLeft, #teamRight {
		font-size: $announcement-font-size;
		width: 50%;
	}

	#teamLeft {
		float: left;
		color: v-bind(teamLeftTextColor)
	}

	#teamRight {
		float: right;
		color: v-bind(teamRightTextColor);
	}
}

#announcementTeamRow {
	justify-content: space-evenly;
	text-align: center;
}

// for slide transitioning in and out global announcement
.animation-global-enter-active,
.animation-global-leave-active {
	transition: all 0.75s ease-out;
}

.animation-global-enter-from {
	transform: translateX(-100%);
	opacity: 0;
}

.animation-global-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}
</style>
