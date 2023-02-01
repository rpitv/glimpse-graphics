<template>
	<div>
		<h2>
			<n-button @click="replicants.lowerThird.bug.value = !replicants.lowerThird.bug.value"
					  :type="replicants.lowerThird.bug.value ? 'error' : 'success'">
				{{ replicants.lowerThird.bug.value ? "Hide" : "Show" }}
			</n-button>
			Display Bug
		</h2>
		<h2>
			<n-button @click="replicants.lowerThird.scoreboard.value = !replicants.lowerThird.scoreboard.value"
					  :type="replicants.lowerThird.scoreboard.value ? 'error' : 'success'">
				{{ replicants.lowerThird.scoreboard.value ? "Hide" : "Show" }}
			</n-button>
			Display Scoreboard
		</h2>
		<h2>
			<n-button @click="replicants.lowerThird.locator.value = !replicants.lowerThird.locator.value"
					  :type="replicants.lowerThird.locator.value ? 'error' : 'success'">
				{{ replicants.lowerThird.locator.value ? "Hide" : "Show" }}
			</n-button>
			Display Locator
		</h2>
		<n-grid :cols="2" :x-gap="10">
			<n-grid-item>
				<label>Home/Left Team Logo <small>(Only input trusted URLs.)</small></label>
				<br>
				<n-input :on-update-value="(string) => replicants.lowerThird.school1Logo.value = string"
						 :default-value="replicants.lowerThird.school1Logo.value"
						 :style="{'max-width': '90%', 'margin-right': '20px'}"
						 placeholder="URL for Home/Left team's logo"/>
			</n-grid-item>
			<n-grid-item>
				<label>Away/Right Team Logo <small>(Only input trusted URLs.)</small></label>
				<br>
				<n-input :on-update-value="(string) => replicants.lowerThird.school2Logo.value = string"
						 :default-value="replicants.lowerThird.school2Logo.value"
						 :style="{'max-width': '90%', 'margin-right': '20px'}" placeholder="URL for Away/Right logo"/>
			</n-grid-item>
		</n-grid>
		<div v-if="replicants.gameSettings.style.value === 'espn'">
			<h2>
				<n-button
					@click="replicants.lowerThird.commentators.show.value = !replicants.lowerThird.commentators.show.value"
					:type="replicants.lowerThird.commentators.show.value ? 'error' : 'success'">
					{{ replicants.lowerThird.commentators.show.value ? "Hide" : "Show" }}
				</n-button>
				Display Commentators/Interviewer and Interviewee
			</h2>
			<n-input :on-update:value="(string) => replicants.lowerThird.commentators.leftPerson.value = string"
					 :default-value="replicants.lowerThird.commentators.leftPerson.value"
					 :style="{'max-width': '40%', 'margin-right': '20px'}" placeholder="Left Person"/>
			<n-input :on-update:value="(string) => replicants.lowerThird.commentators.rightPerson.value = string"
					 :default-value="replicants.lowerThird.commentators.rightPerson.value" style="max-width: 40%"
					 placeholder="Right Person"/>
		</div>
		<div v-if="replicants.gameSettings.style.value === 'rpitv-modern'">
			<h2>
				<n-button
					@click="replicants.lowerThird.endGraphics.show.value = !replicants.lowerThird.endGraphics.show.value"
					:type="replicants.lowerThird.endGraphics.disabled.value ? 'warning' : (replicants.lowerThird.endGraphics.show.value ? 'error' : 'success')"
					:disabled="replicants.lowerThird.endGraphics.disabled.value">
					{{
						replicants.lowerThird.endGraphics.disabled.value ? "Wait" : (replicants.lowerThird.endGraphics.show.value ? "Hide" : "Show")
					}}
				</n-button>
				Display End Graphics (Credits)
			</h2>
			<div class="mt-10" id="endGraphicsSlider">
				<label>Duration of One Scroll in Seconds ({{ replicants.lowerThird.endGraphics.length.value }}
					seconds)</label>
				<br>
				<n-slider
					:min="5"
					:max="60*5"
					v-model:value="replicants.lowerThird.endGraphics.length.value"
					:step="5"
				/>
			</div>
			<div class="mt-10">
				<label>End Graphics Title</label>
				<br>
				<n-input :on-update:value="(string) => replicants.lowerThird.endGraphics.title.value = string"
						 :default-value="replicants.lowerThird.endGraphics.title.value" style="max-width: 40%"
						 placeholder="Title"/>
			</div>
			<div class="mt-10">
				<label>End Graphics Positions and Names</label>
				<br>
				<n-input type="textarea"
						 id="endGraphicsTextarea"
						 :on-update:value="(string) => {replicants.lowerThird.endGraphics.message.value = string; }"
						 :default-value="replicants.lowerThird.endGraphics.message.value"
						 :style="{height: `${replicants.lowerThird.endGraphics.message.value.split('\n').length + 15}em`}"
						 placeholder="Director&#10;Producer&#10;Replay Operator&#10;Graphics Operator&#10;Camera Operator"
						 ref="endGraphicsTextarea"/>
			</div>
		</div>
		<h2>FOR TESTING PURPOSES</h2>
		<div>SOG TEAM 1: {{ replicants.teams[0].shots }}</div>
		<div>SOG TEAM 2: {{ replicants.teams[1].shots }}</div>
		<br>
			<div>(pak14) Main Clock/Time Out/TOD (mm:ss/ss.t ): {{replicants.tmpDaktronics.pak14.value}} </div> <br>
			<div>(pak29) Main Clock/Time Out Horn (' ' or 'h'): {{replicants.tmpDaktronics.pak29.value}} </div> <br>
			<div>(pak40) Time of Day (hh:mm:ss): {{replicants.tmpDaktronics.pak40.value}} </div> <br>
			<div>(pak48) Home Team Name: {{replicants.tmpDaktronics.pak48.value}} </div> <br>
			<div>(pak88) Home Team Abbreviation: {{replicants.tmpDaktronics.pak88.value}} </div> <br>
			<div>(pak60) Internal Relay (' ' or 'z', 's', 'h'): {{replicants.tmpDaktronics.pak160.value}} </div> <br>
			<div>(pak201) Shot Clock Time (mm:ss): {{replicants.tmpDaktronics.pak201.value}} </div> <br>
			<div>(pak226) Home Player #1-Number: {{replicants.tmpDaktronics.pak226.value}} </div> <br>
			<div>(pak228) "Home Player #1-Penalty Time (mm:ss)": {{replicants.tmpDaktronics.pak228.value}} </div> <br>
			<div>(pak236) Home Player #2-Penalty Time (mm:ss): {{replicants.tmpDaktronics.pak238.value}} </div> <br>
			<div>(pak238) Home Player #2-Number: {{replicants.tmpDaktronics.pak236.value}} </div> <br>
			<div>(pak286) Guest Player #1-Number: {{replicants.tmpDaktronics.pak286.value}} </div> <br>
			<div>(pak278) Home Player #6-Penalty Time (mm:ss): {{replicants.tmpDaktronics.pak278.value}} </div> <br>
			<div>(pak288) "Guest Player #1-Penalty Time (mm:ss)": {{replicants.tmpDaktronics.pak288.value}} </div> <br>
			<div>(pak296) Guest Player #2-Number: {{replicants.tmpDaktronics.pak296.value}} </div> <br>
	</div>
</template>

<script setup lang="ts">
import {NButton, NGrid, NGridItem, NInput, NSlider} from "naive-ui";
import {loadReplicants} from "../../browser-common/replicants";
import {ref, watch} from "vue";

const replicants = await loadReplicants();
</script>

<style scoped>
.mt-10 {
	margin-top: 10px;
}

#endGraphicsTextarea {
	width: 40%
}

#endGraphicsSlider {
	width: 40%;
}
</style>
