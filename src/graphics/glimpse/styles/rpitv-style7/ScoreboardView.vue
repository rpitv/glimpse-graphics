<template>
	<div id="containerScoreboardView">
		<div id="announcementGlobalRow">{{ announcementGlobalMsg }}</div>
		<div id="mainScoreboardView" ref="mainScoreboardView">
			<div id="clockRow" ref="elmClockRow">
				<img :src="RPITVLogo" alt="RPI TV Logo" id="clockLogo">
				<span id="clockClock">{{ formattedClockTime }}</span>
				<span id="clockPeriod">{{ formattedPeriod }}</span>
			</div>
			<div id="teamRow">
				<TeamView :team-id="1" :text-color="teamLeftTextColor" :style="backgroundGradientT2" id="teamLeft"/>
				<TeamView :team-id="0" :text-color="teamRightTextColor" :style="backgroundGradientT1" id="teamRight"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../../../browser-common/replicants";
import RPITVLogo from "../../../../assets/rpitv-modern/rpitv_logo.svg";
import TeamView from "./TeamView.vue";
import {computed, onMounted, ref} from "vue";

const replicants = await loadReplicants();
const teamLeftBgColor = replicants.teams[1].primaryColor;
const teamRightBgColor = replicants.teams[0].primaryColor;
const clock = replicants.scoreboard.clock;
const period = replicants.scoreboard.period;

const teamLeftTextColor = computed(() => pickTextColorBasedOnBgColorSimple(teamLeftBgColor.value, '#ffffff', '#000000'));
const teamRightTextColor = computed(() => pickTextColorBasedOnBgColorSimple(teamRightBgColor.value, '#ffffff', '#000000'));

const elmClockRow = ref<HTMLDivElement | null>();
const elmClockHeight = ref<string>("1.7em");
onMounted(() => {
	if (elmClockRow.value)
		elmClockHeight.value = elmClockRow.value.offsetHeight + "px";
});


const backgroundGradientT1 = computed(() => {
	return "background-image: linear-gradient(135deg," + replicants.teams[0].primaryColor.value + "," + replicants.teams[0].secondaryColor.value + ");";
});

const backgroundGradientT2 = computed(() => {
	return "background-image: linear-gradient(225deg," + replicants.teams[1].primaryColor.value + "," + replicants.teams[1].secondaryColor.value + ");";
});

const announcementGlobalMsg = computed<string>(() => {
	const g = replicants.announcements.global.value;
	if (g.length === 0)
		return "";
	return g[0].message;
});

const formattedClockTime = computed<string>(() => {
	const zeroPad = (n) => {
		return n.padStart(2, "0");
	};
	const minutes = Math.floor(clock.time.value / 60000).toString();
	const seconds = Math.floor((clock.time.value % 60000) / 1000).toString();
	const millis = Math.floor((clock.time.value % 1000) / 100).toString();
	if (minutes === '0') {
		return `${zeroPad(seconds)}.${zeroPad(millis)}`;
	} else {
		return `${zeroPad(minutes)}:${zeroPad(seconds)}`;
	}
});

const formattedPeriod = computed<string>(() => {
	if (period.value > replicants.gameSettings.periods.count.value) {
		const overtimePeriod = period.value - replicants.gameSettings.periods.count.value;
		if (overtimePeriod === 1) {
			return "OT";
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
</script>

<style scoped lang="scss">
#containerScoreboardView {
	--announcement-font-size: 1.6vh;
	--padding: 0.1vh;
	--scoreboard-width: 18vw;
	--main-pos-left: 4vw;
	--main-pos-top: 4vh;
	--clock-font-size: 2.8vh;
	--announcement-global-color: rgb(91, 79, 14);
	--announcement-global-bg: rgb(240, 224, 88);
	--clock-row-color: rgb(27, 25, 25);
	--clock-row-bg: white;
}

#mainScoreboardView {
	width: var(--scoreboard-width);
	font-family: "Roboto", sans-serif;
	left: var(--main-pos-left);
	top: var(--main-pos-top);
	position: absolute;
	z-index: 1;
}

#announcementGlobalRow {
	text-align: center;
	color: var(--announcement-global-color);
	background: var(--announcement-global-bg);
	left: calc(var(--main-pos-left) + var(--scoreboard-width));
	top: var(--main-pos-top);
	height: v-bind(elmClockHeight);
	padding-left: calc(3 * var(--padding));
	padding-right: calc(3 * var(--padding));
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	z-index: 1;
	font-size: var(--clock-font-size);
	//transform: translateX(-10px);
}

#clockRow {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: var(--clock-font-size);
	background: var(--clock-row-color);
	color: var(--clock-row-bg);
	padding: var(--padding);
	z-index: 100;
	padding-bottom: calc(2 * var(--padding));

	#clockLogo {
		height: 1.5em;
		width: auto;
	}
}


#teamRow {
	justify-content: space-evenly;
	text-align: center;

	#teamLeft, #teamRight {
		padding-top: var(--padding);
		padding-bottom: 0;
		font-size: var(--announcement-font-size);
		width: 50%;
	}

	#teamLeft {
		float: left;
		background: v-bind(teamLeftBgColor);
		color: v-bind(teamLeftTextColor)
	}

	#teamRight {
		float: right;
		background: v-bind(teamRightBgColor);
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
</style>
