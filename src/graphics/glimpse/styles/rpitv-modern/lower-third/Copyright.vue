<template>
	<div :class="{show: replicants.lowerThird.showCopyright.value, hide: !replicants.lowerThird.showCopyright.value}"
		 id="container">
		<div id="center">
			<span id="background">© RPI TV ALL RIGHTS RESERVED</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../../../../browser-common/replicants";

const replicants = await loadReplicants();
</script>

<style scoped lang="scss">
@font-face {
	font-family: "Rubik";
	src: url('../../../../../assets/rpitv-modern/Rubik.ttf');
}

#container {
	position: relative;
}

#center {
	font-family: 'Rubik', sans-serif;
	position: absolute;
	width: 100%;
	top: 85vh;
	text-align: center;
	font-size: 2em;
	font-weight: bold;
}

#background {
	background: #DC001C;
	color: white;
	padding: 1vw;
	border-radius: 1em;
	//border: 0.1em solid black;
}

.hide {
	opacity: 0;
	transition: 1s;
}

.show {
	opacity: 1;
	transition: 1s;
}
</style>
