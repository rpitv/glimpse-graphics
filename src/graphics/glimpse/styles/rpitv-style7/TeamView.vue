<template>
	<div id="mainTeamView">
		<div id="containerTeamView">
			<img id="logo" ref="teamLogoImg" :src="team.logo.value" :alt="team.schoolName.value">
			<span id="teamViewAbbreviation">{{ team.abbreviation.value }}</span>
			<span id="teamViewScore">{{ team.score.value }}</span>
		</div>
		<div id="containerTeamAnnouncements" v-for="msg in messages" class="teamAnnouncement">
			{{ computedMessage(msg).value }}
		</div>
	</div>
</template>

<script setup lang="ts">
import {loadReplicants} from "../../../../browser-common/replicants";
import {Announcement} from "../../../../common/Announcement";
import {computed, onMounted, ref} from "vue";

const props = defineProps({
	teamId: {
		type: Number,
		required: true
	},
	textColor: {
		type: String,
		required: true
	}
});

const replicants = await loadReplicants();
const team = replicants.teams[props.teamId];
const messages = replicants.announcements[<"team1" | "team2">`team${props.teamId + 1}`];
const teamPrimaryColor = team.primaryColor;
const teamTextColor = props.textColor;
const teamAbbreviationOffset = "-1.4vw";

const teamLogoImg = ref<HTMLImageElement>();
const teamViewHeight = ref<string>("5vh");
onMounted(() => {
	if (teamLogoImg.value)
		teamViewHeight.value = teamLogoImg.value.offsetHeight + "px";
})

function computedMessage(message: Announcement) {
	return computed(() => {
		if (!message.timer || !message.timer.visible) {
			return message.message;
		} else {
			const timeRemaining = message.timer.length - (message.timer.startedAt - replicants.scoreboard.clock.time.value);
			const minutes = Math.max(0, Math.floor(timeRemaining / 60000)).toString();
			// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
			const seconds = Math.max(0, Math.floor((timeRemaining % 60000) / 1000)).toString().padStart(2, "0");

			if (minutes === "0") {
				return message.message + " :" + seconds;
			} else {
				return message.message + " " + minutes + ":" + seconds;
			}
		}
	})
}
</script>

<style scoped lang="scss">
#mainTeamView {
	--announcement-font-size: 1.6vh;
	--padding: 0.1vh;
}

#logo {
	height: 4.8vh;
	padding-top: calc(1.5 * var(--padding));
	transform: translateX(-4.4vw);
	opacity: 1;
	position: absolute;
	z-index: 1;
}

#containerTeamView {
	height: calc(v-bind(teamViewHeight) + var(--padding));
	padding-bottom: var(--padding);

	span {
		font-size: 2.8vh;
		z-index: 3;
		position: absolute;
	}
}

#teamViewAbbreviation {
	transform: scaleY(1.8) translateX(v-bind(teamAbbreviationOffset)) translateY(0.4vh);
}

#teamViewScore {
	text-align: right;
	transform: scaleY(1.8) translateX(-13.75vw) translateY(0.4vh);
	width: 100%;
}

#containerTeamAnnouncements {
	background-color: v-bind(teamPrimaryColor);
}

.teamAnnouncement {
	padding-top: var(--padding);
	padding-bottom: var(--padding);
	font-size: var(--announcement-font-size);

	color: v-bind(teamTextColor);
}
</style>
