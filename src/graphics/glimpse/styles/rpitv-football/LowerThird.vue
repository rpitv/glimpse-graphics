<template>
	<div :class="{show: replicants.lowerThird.bug.value, hide: !replicants.lowerThird.bug.value}">
		<Bug />
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../../../browser-common/replicants";

import Bug from "../rpitv-modern/lower-third/Bug.vue";


const replicants = await loadReplicants();
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
