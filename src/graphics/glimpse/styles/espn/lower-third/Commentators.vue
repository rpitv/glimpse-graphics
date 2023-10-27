<template>
	<img :src="commentators" :style="{'bottom': `${offset}vh`}">
	<div :class="replicants.lowerThird.commentators.rightPerson.value ? 'leftPerson' : 'center'"
		 :style="{'bottom': `${offset + 17.5}vh`}">
		{{replicants.lowerThird.commentators.leftPerson.value}}
	</div>
	<div :class="replicants.lowerThird.commentators.leftPerson.value ? 'rightPerson' : 'center'"
		 :style="{'bottom': `${offset + 17.5}vh`}">
		{{replicants.lowerThird.commentators.rightPerson.value}}
	</div>
</template>

<script setup lang="ts">
import commentators from "../../../../../assets/espn/Commentators.png"
import { loadReplicants } from "../../../../../browser-common/replicants";
import {computed, ref, watch} from "vue";

const replicants = await loadReplicants();

const offset = computed(() => {
	if (replicants.lowerThird.commentators.offset.enabled.value)
		return replicants.lowerThird.commentators.offset.number.value;
	else
		return 0;
})

</script>

<style scoped>
@font-face {
	font-family: "swiss721_med";
	src: url('../../../../../assets/espn/Swiss721Medium.ttf')
}
div {
	position: absolute;
	font-family: "swiss721_med";
	color: rgb(63, 64, 59);
}
img {
	position: absolute;
	left: 0;
	width: 100vw;
	height: 100vh;
	transition: opacity 1s;
}
.leftPerson {
	left: 14vw;
	width: 36vw;
	text-align: center;
	font-size: 3.5vh;
}
.rightPerson {
	left: 50vw;
	width: 36.5vw;
	text-align: center;
	font-size: 3.5vh;
}

.center {
	width: 100vw;
	left: 0vw;
	text-align: center;
	font-size: 3.5vh;
}
</style>
