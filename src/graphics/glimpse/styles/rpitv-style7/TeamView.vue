<template>
	<div class="mainTeamView">
		<div class="containerTeamView" :style="backgroundGradient">
			<img class="logo" ref="teamLogoImg" :src="team.logo.value" :alt="team.schoolName.value">
			<span class="teamViewAbbreviation">{{ computeAbbreviation(team.abbreviation.value) }}</span>
			<span class="teamViewScore">{{ computeScore(team.score.value) }}</span>
		</div>
		<TransitionGroup tag="div" name="animation-team-msg">
			<div v-for="(msg, i) in messages" :key="msg.id" :style="{'z-index': BASE_Z_INDEX - i}"
				 :class="['teamAnnouncement', (i === 0 ? '' : 'fade-in'), (i === messages.length - 1 ? 'fade-out' : '')]">
				{{ computedMessage(msg).value }}
			</div>
		</TransitionGroup>
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
const BASE_Z_INDEX = 69;

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
				return message.message + " 0:" + seconds;
			} else {
				return message.message + " " + minutes + ":" + seconds;
			}
		}
	})
}

const backgroundGradient = computed(() => {
	return "background-image: linear-gradient(135deg," + team.primaryColor.value + "," + team.secondaryColor.value + ");";
});

const computeScore = (score: number) => {
	// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
	return score.toString().padStart(2, "\x00");
}

const computeAbbreviation = (abbr: string) => {
	const max = Math.max(replicants.teams[0].abbreviation.value.length, replicants.teams[1].abbreviation.value.length);
	// noinspection TypeScriptUnresolvedFunction - Not sure why this is happening in my IDE
	return abbr.padEnd(max, "\x00");
}
</script>

<style scoped lang="scss">
$announcement-font-size: 1.6vh;
$announcement-font-size-inverted: -1.7vh;
$padding-var: 0.1vh;
$team-font-size: 2.5vh;

.mainTeamView {
	z-index: calc(v-bind(BASE_Z_INDEX) + 1);
	color: v-bind(teamTextColor);
}

.logo {
	height: 4.3vh;
	padding: 2 * $padding-var;
	opacity: 1;
	z-index: calc(v-bind(BASE_Z_INDEX) + 1);
	display: flex;
	filter: drop-shadow(0.3vh 0.3vw 1vh black);
}

.containerTeamView {
	height: calc(v-bind(teamViewHeight) + $padding-var);
	padding-bottom: $padding-var;
	background-color: v-bind(teamPrimaryColor);
	z-index: calc(v-bind(BASE_Z_INDEX) + 3);
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	span {
		font-size: $team-font-size;
		z-index: calc(v-bind(BASE_Z_INDEX) + 2);
	}
}

.teamViewAbbreviation {
	transform: scaleY(1.8);
	padding: $padding-var;
}

.teamViewScore {
	text-align: right;
	transform: scaleY(1.8) translateX(-0.2vw);
	width: 100%;
	padding: $padding-var;
}

.teamAnnouncement {
	padding-top: $padding-var;
	padding-bottom: $padding-var;
	font-size: $announcement-font-size;
	background-color: v-bind(teamPrimaryColor);
	position: relative;
	font-weight: bold;
}

// Vue animation classes for insertion and removing team announcements
.animation-team-msg-move,
.animation-team-msg-enter-active,
.animation-team-msg-leave-active {
	transition: all 1s ease-out;
}

.animation-team-msg-leave-active {
	position: absolute;
	width: 50%;

	&:not(.fade-out) {
		padding-bottom: 2 * $padding-var;
	}
}

.animation-team-msg-enter-from {
	transform: translateY(-100%);

	&.fade-in {
		opacity: 0;
	}
}

.animation-team-msg-leave-to {
	transform: translateY(-100%);
}
</style>
