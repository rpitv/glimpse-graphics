<template>
	<div class="team">
		<div class="team-info">
			<div class="team-logo">
				<img :src="team.logo.value" class="logo">
			</div>
			<div class="team-name">
				UVM
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

const props = defineProps({
	teamId: {
		type: Number,
		required: true
	}
})

const replicants = await loadReplicants();
const team = replicants.teams[props.teamId];

// Calculate the linear gradient
function calcLinearGrad(hex: string): string {
	const hexNoPound = hex.replace("#", '');
	const colors = hexNoPound.match(/.{1,2}/g) as string[];
	let r = parseInt(colors[0], 16);
	let g = parseInt(colors[1], 16);
	let b = parseInt(colors[2], 16);

	if (r >= 100 || g >= 100 || b >= 100) {
		r = Math.floor(r / 2);
		g = Math.floor(g / 2);
		b = Math.floor(b / 2);
	}
	else if (r <= 63 && g <= 63 && b <= 63) {
		r = Math.floor(2 * r / 3 + 84);
		g = Math.floor(2 * g / 3 + 84);
		b = Math.floor(2 * b / 3 + 84);
	} else {
		r = Math.ceil(r / 5);
		g = Math.ceil(g / 5);
		b = Math.ceil(b / 5);
	}

	return "#" + (r.toString(16).length == 1 ? ("0" + r.toString(16)) : r.toString(16)) + (g.toString(16).length == 1 ? ("0" + g.toString(16)) :  g.toString(16))
		+ (b.toString(16).length == 1 ? ("0" + b.toString(16)) :  b.toString(16));
}

function isLighter(color1: string, color2: string): boolean {
	let dec1 = parseInt(color1.replace("#", ''), 16);
	let dec2 = parseInt(color2.replace("#", ''), 16);

	return dec1 > dec2;
}


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
@font-face {
	font-family: "Malgun Gothic";
	src: url("../../../../assets/football/malgun.ttf") format('truetype');
}

.team {
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: center;
	align-content: center;
	//position: fixed;
	background: linear-gradient(v-bind(color1), v-bind(color2));
	width: 15.62vw;
	height: 6.2vh;
	left: 8.2vw;
}

.team-info {
	display: grid;
	grid-template-columns: 3fr 5fr;
	align-items: center;
}

.team-name {
	// TO-DO: Replace
	color: v-bind(nameColor);
	text-align: center;
	font-family: "Malgun Gothic";
	font-weight: bold;
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
