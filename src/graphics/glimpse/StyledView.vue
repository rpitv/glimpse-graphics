<template>
	<div>
		<SlideshowView />
		<div v-if="replicants.gameSettings.style.value === 'espn'">
			<ESPNCopyright />
			<ESPNImageView />
			<ESPNScoreboardView />
			<ESPNLowerThird />
			<ESPNBanner />
		</div>
		<div v-else-if="replicants.gameSettings.style.value === 'rpitv-modern'">
			<TVModernCopyright />
			<TVModernImageView />
			<TVModernScoreboardView />
			<TGVModernLowerThird />
		</div>
		<div v-else-if="replicants.gameSettings.style.value === 'rpitv-style7'">
			<TVStyle7ImageView />
			<TVModernCopyright />
			<TVStyle7Scoreboard />
			<TVStyle7LowerThird />
		</div>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../browser-common/replicants";
import SlideshowView from "./SlideshowView.vue";

import ESPNCopyright from "./styles/espn/lower-third/Copyright.vue"
import ESPNScoreboardView from "./styles/espn/ScoreboardView.vue";
import ESPNImageView from "./styles/espn/ImageView.vue";
import ESPNLowerThird from "./styles/espn/LowerThird.vue";
import ESPNBanner from "./styles/espn/Banner.vue";

import TVModernCopyright from "./styles/rpitv-modern/lower-third/Copyright.vue"
import TVModernScoreboardView from "./styles/rpitv-modern/ScoreboardView.vue";
import TVModernImageView from "./styles/rpitv-modern/ImageView.vue";
import TGVModernLowerThird from "./styles/rpitv-modern/LowerThird.vue";

import TVStyle7Scoreboard from "./styles/rpitv-style7/ScoreboardView.vue";
import TVStyle7ImageView from "./styles/rpitv-style7/ImageView.vue";
import TVStyle7LowerThird from "./styles/rpitv-style7/LowerThird.vue";

import {watch} from "vue";

const replicants = await loadReplicants();

// from false to true then reload page
watch(replicants.gameSettings.api.forceReload, (newV, oldV) => {
	if (!oldV && newV) {
		location.reload();
	}
});
</script>

<style scoped lang="scss">
.hide {
	opacity: 0;
	transition: 1s;
}
.show {
	opacity: 1;
	transition: 1s;
}
</style>
