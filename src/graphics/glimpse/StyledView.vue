<template>
	<div>
		<AdvertisementView />
		<ImageView />
		<div v-if="replicants.gameSettings.style.value === 'espn'">
			<ESPNScoreboardView />
		</div>
		<div v-else-if="replicants.gameSettings.style.value === 'rpitv-modern'">
			<TVModernScoreboardView />
		</div>
	</div>
</template>

<script setup lang="ts">

import {loadReplicants} from "../../browser-common/replicants";
import ESPNScoreboardView from "./styles/espn/ScoreboardView.vue";
import TVModernScoreboardView from "./styles/rpitv-modern/ScoreboardView.vue";
import ImageView from "./ImageView.vue";
import AdvertisementView from "./AdvertisementView.vue";

const replicants = await loadReplicants();
</script>

<style scoped lang="scss">
</style>
