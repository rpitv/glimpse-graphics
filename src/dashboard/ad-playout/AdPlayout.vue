<template>
	<div>Remaining: {{Math.ceil(replicants.ads.timeRemaining.value)}}</div>

	<n-button @click="play(90)">Play 90s</n-button>
	<n-button @click="play(180)">Play 180s</n-button>
	<n-button @click="play(customLength)">Play {{customLength}}s</n-button>

	<n-input-number v-model:value="customLength" />
	<n-input-number v-model:value="replicants.ads.transitionDelay.value" />
</template>

<script setup lang="ts">
import {loadReplicants} from "../../browser-common/replicants";
import {NButton, NInputNumber} from "naive-ui";
import {ref} from "vue";

const replicants = await loadReplicants();

const customLength = ref<number>(60);

async function play(length: number) {
	replicants.ads.timeRemaining.value = length;
}
</script>

<style scoped lang="scss">

</style>
