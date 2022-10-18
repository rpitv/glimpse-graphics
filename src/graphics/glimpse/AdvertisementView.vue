<template>
	<div v-if="currentAd !== null">
		<div class="black-bg" ref="blackBackground"></div>
		<video :src="currentAd.url" ref="adElem" preload="auto" disablepictureinpicture />
	</div>
</template>

<script setup lang="ts">

import {replicant} from "../../browser-common/replicant";
import {nextTick, ref, watch} from "vue";
import {loadReplicants} from "../../browser-common/replicants";

const ads = await replicant('assets:ads');
const replicants = await loadReplicants();

const adElem = ref<HTMLVideoElement|undefined>();
const blackBackground = ref<HTMLElement|undefined>();
const currentAd = ref<{url: string}|null>(null);

watch(() => replicants.ads.timeRemaining.value, async () => {
	for(const ad of ads.value) {
		currentAd.value = ad;

		await nextTick(async () => {
			if(adElem.value === undefined) {
				throw new Error("Video element is undefined");
			}

			await adElem.value.play();
			await new Promise((resolve, reject) => {
				if(adElem.value === undefined) {
					reject(new Error("Video element is undefined"));
					return;
				}
				adElem.value.addEventListener('ended', resolve)
			});

			adElem.value.style.display = 'none';
			await new Promise(resolve => setTimeout(resolve, replicants.ads.transitionDelay.value));
			adElem.value.style.display = '';
		})
	}
	await goBackLive();
});

async function goBackLive(): Promise<void> {
	if(adElem.value === undefined) {
		throw new Error("Video element is undefined");
	}
	adElem.value.style.display = 'none';
	if(blackBackground.value !== undefined && replicants.ads.fadeBackIn.value) {
		blackBackground.value.classList.add('hide');
		await new Promise(resolve => setTimeout(resolve, 1000));
	}
	currentAd.value = null;
}

</script>

<style scoped lang="scss">
.black-bg {
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: black;
	z-index: 99;

	&.hide {
		opacity: 0;
		transition: opacity 1s;
	}
}
video {
	position: fixed;
	top: 0;
	left: 0;

	width: 100vw;
	height: 100vh;
	z-index: 100;
}
</style>
