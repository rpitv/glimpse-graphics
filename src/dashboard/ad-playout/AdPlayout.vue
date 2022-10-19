<template>
	<div class="playing-section">
		<h1>Remaining: {{Math.ceil(replicants.ads.timeRemaining.value)}}</h1>

		<n-button class="controls-button" type="warning" :disabled="!isAdPlaying" @click="wrapUpClicked">Wrap up</n-button>
		<n-button class="controls-button" type="error" :disabled="!isAdPlaying" @click="cutClicked">CUT</n-button>
	</div>

	<hr />
	<h2>Playout</h2>
	<n-grid cols="3" class="playout-section">
		<n-grid-item>
			<h3>Standard</h3>
			<n-input-group>
				<n-button :disabled="isAdPlaying" @click="play(90)">Play 90s</n-button>
				<n-button :disabled="isAdPlaying" @click="play(180)">Play 180s</n-button>
			</n-input-group>
		</n-grid-item>
		<n-grid-item>

			<h3>TV Timeout</h3>
			<n-button :disabled="isAdPlaying" @click="play(Math.ceil(replicants.ads.tvTimeout.currentTime.value))">Play {{Math.ceil(replicants.ads.tvTimeout.currentTime.value)}}s</n-button>
		</n-grid-item>
		<n-grid-item>
			<h3>Custom</h3>
			<n-input-group>
				<n-input-number v-model:value="customLength" />
				<n-button :disabled="isAdPlaying" @click="play(customLength)">Play {{customLength}}s</n-button>
			</n-input-group>
		</n-grid-item>
	</n-grid>

	<hr />
	<h2>Settings</h2>
	<label :for="transitionDelayId">
		Transition Delay
		<n-popover trigger="hover" :max-width="200">
			<template #trigger>
				ⓘ
			</template>
			<span>Delay (in milliseconds) between advertisements, during which a black screen is shown.</span>
		</n-popover>
	</label>
	<n-input-number class="transition-delay-input" :id="transitionDelayId" v-model:value="replicants.ads.transitionDelay.value" />
	<label :for="fadeBackInSwitchId">
		Fade Back In
		<n-popover trigger="hover" :max-width="200">
			<template #trigger>
				ⓘ
			</template>
			<span>Whether the regular graphics should fade back in from black after the ad break is complete. (1000ms)</span>
		</n-popover>
	</label>
	<n-switch :id="fadeBackInSwitchId" v-model:value="replicants.ads.fadeBackIn.value" />
</template>

<script setup lang="ts">
import {loadReplicants} from "../../browser-common/replicants";
import {NButton, NInputNumber, NInputGroup, NSwitch, NGrid, NGridItem, NPopover} from "naive-ui";
import {computed, ref} from "vue";
import {v4} from "uuid";

const replicants = await loadReplicants();

const customLength = ref<number>(60);

const transitionDelayId = v4();
const fadeBackInSwitchId = v4();

const isAdPlaying = computed(() => replicants.ads.timeRemaining.value > 0);

async function play(length: number) {
	replicants.ads.timeRemaining.value = length;
}

function wrapUpClicked(): void {

}

function cutClicked(): void {
	if(confirm("Are you sure you want to cut the ad break short?")) {
		replicants.ads.timeRemaining.value = 0
	}
}
</script>

<style scoped lang="scss">
label, .controls-button {
	margin-right: 1em;
}

.transition-delay-input {
	margin-bottom: 1em;
}

h2,h3 {
	margin-bottom: 0;
}

.playout-section, .playing-section {
	text-align: center;
}
</style>
