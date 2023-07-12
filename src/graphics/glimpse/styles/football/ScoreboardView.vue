<template>
	<div class="scoreboard">
		<TeamView class="team" team-id="0"/>
	</div>
</template>

<script setup lang="ts">
import TeamView from "./TeamView.vue";
import { loadReplicants } from "../../../../browser-common/replicants";

const replicants = await loadReplicants();


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
}
</style>
