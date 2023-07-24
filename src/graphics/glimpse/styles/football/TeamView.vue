<template>
	<div class="team">
		<div class="team-info">
			<div class="team-logo">
				<img :src="team.logo.value" class="logo">
			</div>
			<div class="team-name">
				{{ team.abbreviation.value }}
			</div>
		</div>
		<div class="team-score">
			{{ team.score }}
		</div>
	</div>
</template>

<script setup lang="ts">

import {computed, defineProps} from "vue";
import {loadReplicants} from "../../../../browser-common/replicants";
import isDarkColor from "is-dark-color";
import { calcLinearGrad, isLighter } from "../../../../dashboard/util";

const props = defineProps({
	teamId: {
		type: Number,
		required: true
	}
})

const replicants = await loadReplicants();
const team = replicants.teams[props.teamId];

const color1 = computed(() => {
	const linearGradient = calcLinearGrad(team.primaryColor.value);
	if (!isLighter(team.primaryColor.value, linearGradient))
		return linearGradient;
	return team.primaryColor.value;
})

const color2 = computed(() => {
	const linearGradient = calcLinearGrad(team.primaryColor.value);
	if (!isLighter(team.primaryColor.value, linearGradient))
		return team.primaryColor.value;
	return linearGradient;
})

const color3 = computed(() => {
	const linearGradient = calcLinearGrad(team.secondaryColor.value);
	if (!isLighter(team.secondaryColor.value, linearGradient))
		return linearGradient;
	return team.secondaryColor.value;
})

const color4 = computed(() => {
	const linearGradient = calcLinearGrad(team.secondaryColor.value);
	if (!isLighter(team.secondaryColor.value, linearGradient))
		return team.secondaryColor.value;
	return linearGradient;
})

const nameColor = computed(() => isDarkColor(team.primaryColor.value) ? "white" : "black");
const scoreColor = computed(() => isDarkColor(team.secondaryColor.value) ? "white" : "black");

</script>

<style scoped lang="scss">


.team {
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
	align-content: center;
	//position: fixed;
	background: linear-gradient(v-bind(color1), v-bind(color2));
	width: 16vw;
	height: 6.2vh;
	left: 8.2vw;
}

.team-info {
	display: grid;
	grid-template-columns: 3fr 5fr;
	align-items: center;
}

.team-name {
	color: v-bind(nameColor);
	text-align: center;
	font-family: "Malgun Gothic";
	font-weight: bolder;
	text-shadow: 2px 2px 4px #292929;
	font-size: 4.63vh;
}

.team-score {
	text-align: center;
	height: 6.2vh;
	background: linear-gradient(v-bind(color3), v-bind(color4));
	font-size: 4.63vh;
	color: v-bind(scoreColor);
	text-shadow: 2px 2px 4px #292929;
	font-family: "Malgun Gothic";
	font-weight: bold;

}

.team-logo {
	display: flex;
	justify-content: center;
}

.logo {
	width: 100%;
	height: 100%;
	max-width: 3vw;
	max-height: 5vh;
	filter: drop-shadow(3px 3px 2px #292929);
}
</style>
