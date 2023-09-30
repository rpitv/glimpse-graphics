<template>
	<div class="team-name">
		<h3>
			Insert Team Name
		</h3>
	</div>
	<div>
		Current Results: {{props.team.value}}
	</div>
	<div>
		<v-btn @click="addScore">✅</v-btn>
		<v-btn @click="addMiss">❌</v-btn>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../browser-common/replicants";
import {PropType} from "vue";

const replicants = await loadReplicants();

const props = defineProps({
	team: {
		type: Object,
		required: true,
		default() {
			return {value: ""}
		}
	},
	index: {
		type: Object,
		required: true,
		default() {
			return {value: 0}
		}
	}
});

function addScore() {
	let teamShootout = props.team.value.split('');
	teamShootout[props.index.value] = "✅";
	props.team.value = teamShootout.join('');
	props.index.value++;
}

function addMiss() {
	let teamShootout = props.team.value.split('');
	teamShootout[props.index.value] = "❌";
	props.team.value = teamShootout.join('');
	props.index.value++;
}

</script>

<style scoped lang="scss">
.team-name {
	text-align: center;
}
</style>
