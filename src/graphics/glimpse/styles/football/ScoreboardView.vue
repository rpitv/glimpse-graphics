<template>
	<div :class="'scoreboard ' + (replicants.scoreboard.visible.value ? 'show' : 'hidden')">
		<div class="rpitv">
			<img :src="rpitvBug" class="logo">
		</div>
		<TeamView class="team" :team-id="0"/>
		<TeamView class="team" :team-id="1" />
		<div class="clock-period">
			<div class="period">
				{{ formattedPeriod }}
			</div>
			<div class="clock">
				{{ formattedClockTime }}
			</div>
		</div>
		<div class="play-clock">40</div>
		<div class="down-counter">TBD</div>
	</div>
</template>

<script setup lang="ts">
import TeamView from "./TeamView.vue";
import { loadReplicants } from "../../../../browser-common/replicants";
import rpitvBug from "../../../../assets/football/rpitv_logo.png";
import {computed} from "vue";
const replicants = await loadReplicants();

const clock = replicants.scoreboard.clock;
const period = replicants.scoreboard.period;

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
.scoreboard {
	//background-color: white;
	filter: drop-shadow(5px 5px 6px #7D7D7D);
	position: fixed;
	left: 14.55vw;
	top: 84.07vh;
	width: 70.9vw;
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
	width: 10.34vw;
	height: 6.2vh;
	background: linear-gradient(#9D9595, #2E2D2D);
	font-size: 2.4vw;
	color: white;
	justify-content: space-around;
	text-shadow: 2px 2px 4px #292929;
	text-align: center;
}


.play-clock {
	width: 4.45vw;
	height: 6.2vh;
	background: linear-gradient(#C5C5C5, #636363);
	font-size: 4.56vh;
	text-align: center;
}

.down-counter {
	width: 16.7vw;
	height: 6.2vh;
	background-color: black;
	color: white;
}

</style>
