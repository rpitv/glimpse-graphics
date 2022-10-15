<template>
	<div class="tv-timeout-wrapper">
		<div class="timer-text">
			{{ Math.ceil(replicants.ads.tvTimeout.currentTime.value) }}s
		</div>
		<n-button class="start-stop-btn" @click="isTvTimeoutRunning = !isTvTimeoutRunning" large :type="isTvTimeoutRunning ? 'error' : 'primary'">
			{{ isTvTimeoutRunning ? "Stop" : "Start" }} TV Timeout
		</n-button>
		<n-input-number min="0" v-model:value="replicants.ads.tvTimeout.length.value" />
		<n-checkbox :disabled="!synth" v-model:checked="doCountdown">
			TTS Countdown
		</n-checkbox>
		<div v-if="!synth">
			TTS is not supported by your browser. Please try Edge, Chrome, or Opera.
		</div>
	</div>
</template>

<script setup lang="ts">
import {NButton, NInputNumber, NCheckbox} from "naive-ui";
import {loadReplicants} from "../../browser-common/replicants";
import {ref, watch, watchEffect} from "vue";

const zeroThruNineteen = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
	'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tens = ['zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const alreadySpoken = new Set();

const replicants = await loadReplicants();
const isTvTimeoutRunning = replicants.ads.tvTimeout.isRunning;

const doCountdown = ref<boolean>(window.speechSynthesis !== undefined);
const synth = window.speechSynthesis;
if(doCountdown.value && synth) {
	watchEffect(() => {
		if(
			!doCountdown.value ||
			!replicants.ads.tvTimeout.isRunning.value ||
			alreadySpoken.has(Math.ceil(replicants.ads.tvTimeout.currentTime.value))
		) {
			return;
		}

		if (Math.ceil(replicants.ads.tvTimeout.currentTime.value) <= 10) {
			speakCurrentTime(false)
		} else if(
			Math.ceil(replicants.ads.tvTimeout.currentTime.value) % 30 === 0 &&
			Math.ceil(replicants.ads.tvTimeout.currentTime.value) !== replicants.ads.tvTimeout.length.value
		) {
			speakCurrentTime(true)
		}

		alreadySpoken.add(Math.ceil(replicants.ads.tvTimeout.currentTime.value));
	})

	watchEffect(() => {
		if(replicants.ads.tvTimeout.isRunning.value === false) {
			alreadySpoken.clear();
		}
	})
}

watch(() => replicants.ads.tvTimeout.length.value, () => {
	if(!replicants.ads.tvTimeout.isRunning.value) {
		replicants.ads.tvTimeout.currentTime.value = replicants.ads.tvTimeout.length.value;
	}
})

function speakCurrentTime(withSeconds: boolean) {
	const writtenNumber = numberToWrittenForm(Math.ceil(replicants.ads.tvTimeout.currentTime.value));
	const utterThis = new SpeechSynthesisUtterance(writtenNumber + (withSeconds ? " seconds" : ""));
	utterThis.lang = "en-US";
	utterThis.rate = 1.25;
	synth.speak(utterThis);
}

/**
 * Convert an integer number to a written English form. E.g., "7" becomes "seven". This is used for the voice
 *   synthesizing, as if a non-English language is selected, the voice will still speak in English when the number
 *   is written out.
 * @param num Number to convert. Expected to be an integer. Non-integer numbers will be rounded up.
 * @returns The number written out in English.
 */
function numberToWrittenForm(num: number): string {
	num = Math.ceil(num);
	if(num < 0) {
		return "negative " + numberToWrittenForm(-num);
	}
	if(num < 20) {
		return zeroThruNineteen[num];
	}
	if(num < 100) {
		return tens[Math.floor(num / 10)] + (num % 10 === 0 ? '' : '-' + zeroThruNineteen[num % 10]);
	}
	return zeroThruNineteen[Math.floor(num / 100)] + ' hundred' + (num % 100 === 0 ? '' : ' ' + numberToWrittenForm(num % 100));
}
</script>

<style scoped lang="scss">
.tv-timeout-wrapper {
	text-align: center;
}
.timer-text {
	font-size: 4em;
}
.start-stop-btn {
	margin-bottom: 1em;
}

</style>
