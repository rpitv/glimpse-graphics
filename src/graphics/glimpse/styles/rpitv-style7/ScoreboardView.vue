<template>
	<div id="mainScoreboardView" ref="mainScoreboardView">
		<div id="announcementGlobalRow">Delayed Penalty</div>

		<div id="clockRow">
			<img :src="RPITVLogo" alt="RPI TV Logo" id="clockLogo">
			<span id="clockClock">20:00</span>
			<span id="clockPeriod">1st</span>
		</div>
		<div id="teamRow">
			<div id="teamRowLeft">
				<img src="" alt="">
				LEFT TEAM
			</div>
			<div id="teamRowRight">
				<img src="" alt="">
				RIGHT TEAM
			</div>
		</div>
		<div id="announcementTeamRow">
			<div id="announcementTeamRowLeft" class="teamAnnouncement">Empty Net</div>
			<div id="announcementTeamRowRight" class="teamAnnouncement">Power Play 2:00</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import RPITVLogo from "../../../../assets/rpitv-modern/rpitv_logo.svg";</script>

<style scoped lang="scss">
#mainScoreboardView {
	--announcement-font-size: 1.3em;
	--padding: 0.3em;
	//--scoreboard-width: max(20vw, auto);
	--scoreboard-width: 20vw;

	width: var(--scoreboard-width);
	font-family: "Roboto", sans-serif;
	left: 5vh;
	top: 5vh;
	position: absolute;
	z-index: 1;
}

#announcementGlobalRow {
	text-align: center;
	color: rgb(91, 79, 14);
	background: rgb(240, 224, 88);
	font-size: var(--announcement-font-size);
	padding: var(--padding);

	//transform: translateY(110%); // todo v-bind
	position: relative;
	z-index: -1;
}

#clockRow {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: 2em;
	background: rgb(27, 25, 25);
	color: white;
	padding: var(--padding);
	z-index: 1000;
}

#clockLogo {
	height: 1em;
	width: auto;
}

#teamRow img {
	height: 5em;
}

#teamRow {
	overflow: hidden;
	white-space: nowrap;
}

#teamRowLeft {
	padding-top: var(--padding);
	padding-bottom: var(--padding);
	float: left;
	width: calc(var(--scoreboard-width) / 2);
	background: #6c26d5;
}

#teamRowRight {
	padding-top: var(--padding);
	padding-bottom: var(--padding);
	float: right;
	width: calc(var(--scoreboard-width) / 2);
	background: #26d5ce;
}

#announcementTeamRow {
	justify-content: space-evenly;
	text-align: center;
}

#announcementTeamRowLeft {
	padding-top: var(--padding);
	padding-bottom: var(--padding);
	font-size: var(--announcement-font-size);
	float: left;
	width: 50%;

	// todo v-bind font color and bg color
	color: black;
	background: yellow;
}

#announcementTeamRowRight {
	padding-top: var(--padding);
	padding-bottom: var(--padding);
	font-size: var(--announcement-font-size);
	float: right;
	width: 50%;

	// todo v-bind font color and bg color
	color: white;
	background: red;
}
</style>
