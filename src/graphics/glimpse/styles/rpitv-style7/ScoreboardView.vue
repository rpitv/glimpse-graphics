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
			<div id="clockRow" ref="elmClockRow" :class="timeRef === '00.00' ? 'clockZero' : ''">
				<img :src="RPITVLogo" alt="RPI TV Logo" id="clockLogo">
				<span id="clockClock" :class="clock.time.value < 10000 ? 'low-time' : ''">
					{{ formattedClockTime }}
				</span>
				<span id="clockPeriod">{{ formattedPeriod }}</span>
			</div>
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
	// zero pads '1' to '01' for monospace font alignment
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
.hidden {
	opacity: 0;
}

#containerScoreboardView {
	--announcement-font-size: 1.6vh;
	--padding: 0.1vh;
	--scoreboard-width: 18vw;
	--main-pos-left: 4vw;
	--main-pos-top: 4vh;
	--clock-font-size: 2.8vh;
	--announcement-global-color: rgb(91, 79, 14);
	--announcement-global-bg: rgb(240, 224, 88);
	--clock-row-bg: rgb(27, 25, 25);
	--clock-row-color: white;
	--clock-zero-red: #862f28;

	font-family: 'Roboto Mono', monospace;
	transition: opacity 1s;
}


#bannerScore {
	position: absolute;
	z-index: 3;
	left: var(--main-pos-left);
	top: calc(var(--main-pos-top) + v-bind(elmClockHeight));
	width: var(--scoreboard-width);
	display: flex;
	align-items: center;
	justify-content: center;

	.tga-hidden {
		opacity: 0;
	}

	.tga-visible {
		width: var(--scoreboard-width);
		text-align: center;
		font-size: var(--clock-font-size);
		height: v-bind(elmTeamViewContainerHeight);
		padding: var(--padding);
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
	width: var(--scoreboard-width);
	left: var(--main-pos-left);
	top: var(--main-pos-top);
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
	color: var(--announcement-global-color);
	background-color: var(--announcement-global-bg);
	left: calc(var(--main-pos-left) + var(--scoreboard-width));
	top: calc(1px + var(--main-pos-top));
	height: calc(v-bind(elmClockHeight) - 1px);
	padding: var(--padding);
	padding-left: calc(3 * var(--padding));
	padding-right: calc(3 * var(--padding));
	border-top: 1px;
	position: absolute;
	z-index: 1;
	font-size: var(--clock-font-size);
	font-weight: bold;
}

#clockRow {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: var(--clock-font-size);
	color: var(--clock-row-color);
	padding: var(--padding);
	padding-bottom: calc(2 * var(--padding));
	background: linear-gradient(180deg, #625858, #0d0505, #625858);

	#clockLogo {
		height: calc(1.1 * var(--clock-font-size));
		width: auto;
	}

	// when clock is 00.00 flash change the bg color
	&.clockZero {
		animation: animation-clock-zero-start 2s 1 ease-in,
		animation-clock-zero 1s 9 2s alternate ease-in-out forwards;
	}

	@keyframes animation-clock-zero-start {
		0% {
			background-color: var(--clock-row-bg);
		}

		30%, 100% {
			background-color: var(--clock-zero-red);
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
		font-size: var(--announcement-font-size);
		width: 50%;
	}

	#teamLeft {
		float: left;
		color: v-bind(teamLeftTextColor)
	}

	#teamRight {
		float: right;
		color: v-bind(teamLeftTextColor);
	}
}

#announcementTeamRow {
	justify-content: space-evenly;
	text-align: center;

	#announcementTeamRowLeft {
		padding-top: var(--padding);
		padding-bottom: var(--padding);
		font-size: var(--announcement-font-size);
		float: left;
		width: 50%;
	}

	#announcementTeamRowRight {
		padding-top: var(--padding);
		padding-bottom: var(--padding);
		font-size: var(--announcement-font-size);
		float: right;
		width: 50%;
	}
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

.animation-global-leave-from {
}

.animation-global-leave-to {
	transform: translateX(-100%);
	opacity: 0;
}
</style>
