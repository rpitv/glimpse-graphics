<template>
	<v-card>
		<div class="block" v-if="block" >
			<h1 v-if="replicants.gameSettings.periods.shootouts.value &&
				replicants.scoreboard.period.value !==
				replicants.gameSettings.periods.count.value +
				replicants.gameSettings.periods.overtime.count.value + 1">
				Shootouts are currently not ready yet
			</h1>
			<div v-else>
				<h1>Shootouts detected</h1>
				<v-btn @click="startShootouts">Start</v-btn>
			</div>
		</div>
		<v-row>
			<v-col>
				<ShootoutsTeamView :team="replicants.teams[1].shootouts" :index="team2Index" />
			</v-col>
			<v-col>
				<ShootoutsTeamView :team="replicants.teams[0].shootouts" :index="team1Index" />
			</v-col>
		</v-row>
		<v-btn @click="finishShootouts">Finish</v-btn>
	</v-card>
</template>

<script setup lang="ts">
import ShootoutsTeamView from "./ShootoutsTeamView.vue";
import {loadReplicants} from "../../browser-common/replicants";
import {ref} from "vue";

const replicants = await loadReplicants();
const block = ref<boolean>();

// Since props pass values as read-only, we bypass it by setting the ref
// as an object, however, that leads to funky code here...
const team1Index = ref({
	value: 0
});
const team2Index = ref({
	value: 0
});

function startShootouts() {
	block.value = false;
	replicants.gameSettings.showShootouts.value = true;
	replicants.teams[0].shootouts.value = "---";
	replicants.teams[1].shootouts.value = "---";
}

function finishShootouts() {
	block.value = true;
	replicants.gameSettings.showShootouts.value = false;
	replicants.teams[0].shootouts.value = "";
	replicants.teams[1].shootouts.value = "";
	team1Index.value.value = 0;
	team2Index.value.value = 0;
}

</script>

<style scoped lang="scss">
.block {
	position: absolute;
	width: 100%;
	height: 100%;
	background: black;
	z-index: 1000;
	opacity: 90%;
}
</style>
