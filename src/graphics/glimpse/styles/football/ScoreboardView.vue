<template>
	<div :class="'scoreboard ' + (replicants.scoreboard.visible.value ? 'show' : 'hidden')">
		<div class="rpitv">
			<img :src="rpitvBug" class="logo">
		</div>
		<TeamView class="team" :team-id="0"/>
		<TeamView class="team" :team-id="1" />
		<div class="clock-period">
			<div class="period">
				{{ formattedPeriod.toUpperCase() }}
			</div>
			<div class="clock">
				{{ formattedClockTime }}
			</div>
		</div>
		<div class="play-clock">40</div>
		<div class="down-counter-announcements">{{announcement}}</div>
	</div>
<!--	<div :class="'animation'"></div>-->
</template>

<script setup lang="ts">
import TeamView from "./TeamView.vue";
import { loadReplicants } from "../../../../browser-common/replicants";
import rpitvBug from "../../../../assets/football/rpitv_logo.png";
import {computed, ref} from "vue";
import {calcLinearGrad, isLighter} from "../../../../dashboard/util";
const replicants = await loadReplicants();

const clock = replicants.scoreboard.clock;
const period = replicants.scoreboard.period;

const backgroundColor1 = ref<string>("#FFF700");
const backgroundColor2 = ref<string>("#807C00");

const announcement = computed(() => {
	let currentState = "2ND & 10";
	let linearGrad: string;
	if (replicants.announcements.team1.value[0]?.message) {
		currentState = replicants.announcements.team1.value[0].message;
		linearGrad = calcLinearGrad(replicants.teams[0].primaryColor.value);
		if (isLighter(replicants.teams[0].primaryColor.value, linearGrad)) {
			backgroundColor1.value = replicants.teams[0].primaryColor.value;
			backgroundColor2.value = linearGrad;
		} else {
			backgroundColor1.value = linearGrad;
			backgroundColor2.value = replicants.teams[0].primaryColor.value;
		}
	} else if (replicants.announcements.team2.value[0]?.message) {
		currentState = replicants.announcements.team2.value[0].message;
		linearGrad = calcLinearGrad(replicants.teams[1].primaryColor.value);
		if (isLighter(replicants.teams[1].primaryColor.value, linearGrad)) {
			backgroundColor1.value = replicants.teams[1].primaryColor.value;
			backgroundColor2.value = linearGrad;
		} else {
			backgroundColor1.value = linearGrad;
			backgroundColor2.value = replicants.teams[1].primaryColor.value;
		}
	} else {
		backgroundColor1.value = "#FFF700";
		backgroundColor2.value = "#807C00";
	}
	if (replicants.announcements.global.value[0]?.message) {
		currentState = replicants.announcements.global.value[0].message;
		backgroundColor1.value = "#FFF700";
		backgroundColor2.value = "#807C00";
	}
	return currentState;
})

const formattedClockTime = computed<string>(() => {
	const minutes = Math.floor(clock.time.value / 60000).toString();
	let seconds = Math.floor((clock.time.value % 60000) / 1000).toString();
	const millis = Math.floor((clock.time.value % 1000) / 100).toString();
	if (minutes === '0') {
		return `${seconds}.${millis}`;
	} else {
		// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
		seconds = seconds.padStart(2, '0');
		return `${minutes}:${seconds}`;
	}
})

const formattedPeriod = computed<string>(() => {
	if(period.value > replicants.gameSettings.periods.count.value) {
		const overtimePeriod = period.value - replicants.gameSettings.periods.count.value;
		if(overtimePeriod === 1) {
			return 'OT';
		} else {
			return `OT${overtimePeriod}`;
		}
	}

	if(period.value === undefined) {
		return '1st';
	}

	// Teens for some reason all end in "th" in English.
	if(period.value > 10 && period.value < 20) {
		return period.value + 'th';
	}

	// For all other numbers, we need to figure out the suffix.
	const lastNumberOfPeriod = period.value % 10;
	if(lastNumberOfPeriod === 1) {
		return `${period.value}st`;
	} else if(lastNumberOfPeriod === 2) {
		return `${period.value}nd`;
	} else if(lastNumberOfPeriod === 3) {
		return `${period.value}rd`;
	} else {
		return `${period.value}th`;
	}
});

</script>

<style scoped lang="scss">
@font-face {
	font-family: "Malgun Gothic";
	src: url("../../../../assets/football/malgun.ttf") format('truetype');
}

.scoreboard {
	//background-color: white;
	filter: drop-shadow(5px 5px 6px #7D7D7D);
	position: fixed;
	left: 12.8vw;
	top: 84.07vh;
	width: 73.35vw;
	height: 6.2vh;
	display: flex;
}

.show {
	opacity: 1;
	transition: 1s;
}

.hidden {
	opacity: 0;
	transition: 1s;
}

.rpitv {
	width: 8.2vw;
	height: 6.2vh;
	background: linear-gradient(#4E4E4E, #181818);
	display: flex;
	justify-content: center;
	align-items: center;
}

.logo {
	width: 6.7vw;
	height: 4.56vh;
}

.clock-period {
	display: flex;
	width: 12vw;
	height: 6.2vh;
	background: linear-gradient(#9D9595, #2E2D2D);
	font-size: 4.56vh;
	color: white;
	justify-content: space-around;
	text-shadow: 2px 2px 4px #292929;
	text-align: center;
	font-family: "Malgun Gothic";
	font-weight: bold;
}


.play-clock {
	width: 4.45vw;
	height: 6.2vh;
	background: linear-gradient(#C5C5C5, #636363);
	font-size: 4.56vh;
	text-align: center;
	font-family: "Malgun Gothic";
	font-weight: bold;
	text-shadow: 2px 2px 4px #292929;
}

.down-counter-announcements {
	width: 16.7vw;
	height: 6.2vh;
	transition: 1s;
	background: linear-gradient(v-bind(backgroundColor1), v-bind(backgroundColor2));
	color: black;
	font-family: "Malgun Gothic";
	font-weight: bold;
	font-size: 4.56vh;
	text-align: center;
	text-shadow: 2px 2px 4px #292929;
}


.animation {
	left: 12.8vw;
	top: 84.07vh;
	width: 73.35vw;
	height: 6.2vh;
	background-color: white;
	position: fixed;
}

</style>
