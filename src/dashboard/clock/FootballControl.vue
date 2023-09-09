<template>
	<div v-if="replicants.gameSettings.style.value === 'football'">
		<hr>
		<h1>Football Controls</h1>
		<br>
		<div>
			<v-text-field label="Current Down" class="inputs" clearable variant="outlined" type="number" v-model="replicants.scoreboard.down.value"/>
		</div>
		<div>
			<v-text-field label="Current Yards To Go" class="inputs" clearable variant="outlined" type="number" v-model="replicants.scoreboard.yardsToGo.value"/>
		</div>
		<div>
			<v-combobox label="Possession"
						density="comfortable"
						:items="items"
						v-model="replicants.scoreboard.possession.value"
						variant="outlined"
						hint="'<' is Home Team, '>' is Away Team, '<Blank>' is No Possession"
						persistent-hint />
		</div>
		<br>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants } from "../../browser-common/replicants";
import {computed, ref, watch} from "vue";

const replicants = await loadReplicants();

const items = ref(["<", ">", ""]);

</script>

<style scoped lang="scss">
.inputs {
}
</style>
