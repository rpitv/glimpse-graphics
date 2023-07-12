<template>
	<div class="team">
		<div class="team-info">
			<div>
				I
			</div>
			<div class="team-name">
				UVM
			</div>
		</div>
		<div class="team-score">
			@2
		</div>
	</div>
</template>

<script setup lang="ts">

import {computed, defineProps} from "vue";
import {loadReplicants} from "../../../../browser-common/replicants";

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
	console.log(linearGradient);
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
	position: fixed;
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
	color: white;
	text-align: center;
	font-family: "Malgun Gothic";
	font-weight: bold;
	text-shadow: 3px 3px 6px #000000;
	font-size: 4.63vh;
}

.team-score {
	background-color: yellow;
}
</style>
