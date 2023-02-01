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
		<div>

		<h2>FOR TESTING PURPOSES</h2>
		<div>SOG TEAM 1 (422): {{ replicants.teams[0].shots }}</div>
		<div>SOG TEAM 2 (468): {{ replicants.teams[1].shots }}</div>
<!--
			<br>
			<div>(pak14) {{sport["14"].title}}: {{replicants.lowerThird.tmpDaktronics.pak14.value}} </div> <br>
			<div>(pak29) {{sport["29"].title}}: {{replicants.lowerThird.tmpDaktronics.pak29.value}} </div> <br>
			<div>(pak40) {{sport["40"].title}}: {{replicants.lowerThird.tmpDaktronics.pak40.value}} </div> <br>
			<div>(pak48) {{sport["48"].title}}: {{replicants.lowerThird.tmpDaktronics.pak48.value}} </div> <br>
			<div>(pak88) {{sport["88"].title}}: {{replicants.lowerThird.tmpDaktronics.pak88.value}} </div> <br>
			<div>(pak60) {{sport["160"].title}}: {{replicants.lowerThird.tmpDaktronics.pak160.value}} </div> <br>
			<div>(pak201) {{sport["201"].title}}: {{replicants.lowerThird.tmpDaktronics.pak201.value}} </div> <br>
			<div>(pak226) {{sport["226"].title}}: {{replicants.lowerThird.tmpDaktronics.pak226.value}} </div> <br>
			<div>(pak236) {{sport["236"].title}}: {{replicants.lowerThird.tmpDaktronics.pak236.value}} </div> <br>
			<div>(pak286) {{sport["286"].title}}: {{replicants.lowerThird.tmpDaktronics.pak286.value}} </div> <br>
-->

		</div>

	</div>
</template>

<script setup lang="ts">
import {NButton, NGrid, NGridItem, NInput, NSlider} from "naive-ui";
import {
	awayScoreHandler, awayShotHandler,
	homeScoreHandler, homeShotHandler,
	mainClockHandler,
	pak14, pak160, pak201, pak226, pak236, pak286,
	pak29, pak296,
	pak40,
	pak48,
	pak88, periodHandler
} from "../../extension/daktronics-rtd/handlers";
import {loadReplicants} from "../../browser-common/replicants";

const replicants = await loadReplicants();
console.log(replicants)

/*
replicants.lowerThird.tmpDaktronics.pak14.value = "no data";
replicants.lowerThird.tmpDaktronics.pak29.value = "no data";
replicants.lowerThird.tmpDaktronics.pak40.value = "no data";
replicants.lowerThird.tmpDaktronics.pak48.value = "no data";
replicants.lowerThird.tmpDaktronics.pak88.value = "no data";
replicants.lowerThird.tmpDaktronics.pak160.value = "no data";
replicants.lowerThird.tmpDaktronics.pak201.value = "no data";
replicants.lowerThird.tmpDaktronics.pak226.value = "no data";
replicants.lowerThird.tmpDaktronics.pak236.value = "no data";
replicants.lowerThird.tmpDaktronics.pak286.value = "no data";
 */

const packetFrequencies =  {
	"1": 17438,		// h "Main Clock Time (mm:ss/ss.t )",
	"5": 41,		//   ???
	"14": 16001,	//   "Main Clock/Time Out/TOD (mm:ss/ss.t )"
	"29": 40,		//   "Main Clock/Time Out Horn (' ' or 'h')"
	"40": 15176,	//   "Time of Day (hh:mm:ss)"
	"48": 4,		//   "Home Team Name"
	"88": 6,		//   "Home Team Abbreviation"
	"108": 5,		// h "Home Team Score"
	"112": 5,		// h "Guest Team Score"
	"142": 6,		// h "Period"
	"160": 24,		//   "Internal Relay (' ' or 'z', 's', 'h')"
	"201": 3,		//   "Shot Clock Time (mm:ss)"
	"226": 562,		//   "Home Player #1-Number"
	"236": 4,		//   "Home Player #2-Number"
	"286": 700,		//   "Guest Player #1-Number"
	"296": 72,		//   "Guest Player #2-Number"
	"422": 31,		// h "Home Shots On Goal - Total"
	"468": 18		// h "Guest Shots On Goal - Total"
}
const sport = {
	"1": {
		"length": 5,
			"justification": "L",
			"title": "Main Clock Time (mm:ss/ss.t )",
			handler: mainClockHandler
	},
	"6": {
		"length": 8,
			"justification": "L",
			"title": "Main Clock Time (mm:ss.t )"
	},
	"14": {
		"length": 5,
			"justification": "L",
			"title": "Main Clock/Time Out/TOD (mm:ss/ss.t )",
			handler: pak14
	},
	"19": {
		"length": 8,
			"justification": "L",
			"title": "Main Clock/Time Out/TOD (mm:ss.t )"
	},
	"27": {
		"length": 1,
			"justification": "L",
			"title": "Main Clock =0 (' ' or 'z')"
	},
	"28": {
		"length": 1,
			"justification": "L",
			"title": "Main Clock Stopped (' ' or 's')"
	},
	"29": {
		"length": 1,
			"justification": "L",
			"title": "Main Clock/Time Out Horn (' ' or 'h')",
			handler: pak29
	},
	"30": {
		"length": 1,
			"justification": "L",
			"title": "Main Clock Horn (' ' or 'h')"
	},
	"31": {
		"length": 1,
			"justification": "L",
			"title": "Time Out Horn (' ' or 'h')"
	},
	"32": {
		"length": 8,
			"justification": "L",
			"title": "Time Out Time (mm:ss)"
	},
	"40": {
		"length": 8,
			"justification": "L",
			"title": "Time of Day (hh:mm:ss)",
			handler: pak40
	},
	"48": {
		"length": 20,
			"justification": "L",
			"title": "Home Team Name",
			handler: pak48
	},
	"68": {
		"length": 20,
			"justification": "L",
			"title": "Guest Team Name"
	},
	"88": {
		"length": 10,
			"justification": "L",
			"title": "Home Team Abbreviation",
			handler: pak88
	},
	"98": {
		"length": 10,
			"justification": "L",
			"title": "Guest Team Abbreviation"
	},
	"108": {
		"length": 4,
			"justification": "R",
			"title": "Home Team Score",
			handler: homeScoreHandler
	},
	"112": {
		"length": 4,
			"justification": "R",
			"title": "Guest Team Score",
			handler: awayScoreHandler
	},
	"116": {
		"length": 2,
			"justification": "R",
			"title": "Home Time Outs Left - Full"
	},
	"118": {
		"length": 2,
			"justification": "R",
			"title": "Home Time Outs Left - Partial"
	},
	"120": {
		"length": 2,
			"justification": "R",
			"title": "Home Time Outs Left - Television"
	},
	"122": {
		"length": 2,
			"justification": "R",
			"title": "Home Time Outs Left - Total"
	},
	"124": {
		"length": 2,
			"justification": "R",
			"title": "Guest Time Outs Left - Full"
	},
	"126": {
		"length": 2,
			"justification": "R",
			"title": "Guest Time Outs Left - Partial"
	},
	"128": {
		"length": 2,
			"justification": "R",
			"title": "Guest Time Outs Left - Television"
	},
	"130": {
		"length": 2,
			"justification": "R",
			"title": "Guest Time Outs Left - Total"
	},
	"132": {
		"length": 1,
			"justification": "L",
			"title": "Home Time Out Indicator (' ' or '<')"
	},
	"133": {
		"length": 4,
			"justification": "L",
			"title": "Home Time Out Text (' ' or 'TIME')"
	},
	"137": {
		"length": 1,
			"justification": "L",
			"title": "Guest Time Out Indicator (' ' or '>')"
	},
	"138": {
		"length": 4,
			"justification": "L",
			"title": "Guest Time Out Text (' ' or 'TIME')"
	},
	"142": {
		"length": 2,
			"justification": "R",
			"title": "Period",
			handler: periodHandler
	},
	"144": {
		"length": 4,
			"justification": "L",
			"title": "Period Text ('1st ', 'OT', 'OT/2')"
	},
	"148": {
		"length": 12,
			"justification": "L",
			"title": "Period Description ('End of 1st ')"
	},
	"160": {
		"length": 1,
			"justification": "L",
			"title": "Internal Relay (' ' or 'z', 's', 'h')",
			handler: pak160
	},
	"161": {
		"length": 1,
			"justification": "L",
			"title": "Ad Panel / Caption Power ('c')"
	},
	"162": {
		"length": 1,
			"justification": "L",
			"title": "Ad Panel / Caption #1 (' ' or 'c')"
	},
	"163": {
		"length": 1,
			"justification": "L",
			"title": "Ad Panel / Caption #2 (' ' or 'c')"
	},
	"164": {
		"length": 1,
			"justification": "L",
			"title": "Ad Panel / Caption #3 (' ' or 'c')"
	},
	"165": {
		"length": 1,
			"justification": "L",
			"title": "Ad Panel / Caption #4 (' ' or 'c')"
	},
	"166": {
		"length": 35,
			"justification": "R",
			"title": "Reserved for Future Use"
	},
	"201": {
		"length": 8,
			"justification": "L",
			"title": "Shot Clock Time (mm:ss)",
			handler: pak201
	},
	"209": {
		"length": 1,
			"justification": "L",
			"title": "Shot Clock Horn (' ' or 'h')"
	},
	"210": {
		"length": 8,
			"justification": "L",
			"title": "Inverse Time Clock (mm:ss)"
	},
	"218": {
		"length": 8,
			"justification": "L",
			"title": "Inverse/Main/Time Out/TOD (mm:ss)"
	},
	"226": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #1-Number",
			handler: pak226
	},
	"228": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #1-Penalty Time (mm:ss)"
	},
	"236": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #2-Number",
			handler: pak236
	},
	"238": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #2-Penalty Time (mm:ss)"
	},
	"246": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #3-Number"
	},
	"248": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #3-Penalty Time (mm:ss)"
	},
	"256": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #4-Number"
	},
	"258": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #4-Penalty Time (mm:ss)"
	},
	"266": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #5-Number"
	},
	"268": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #5-Penalty Time (mm:ss)"
	},
	"276": {
		"length": 2,
			"justification": "R",
			"title": "Home Player #6-Number"
	},
	"278": {
		"length": 8,
			"justification": "L",
			"title": "Home Player #6-Penalty Time (mm:ss)"
	},
	"286": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #1-Number",
			handler: pak286
	},
	"288": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #1-Penalty Time (mm:ss)"
	},
	"296": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #2-Number",
			handler: pak296
	},
	"298": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #2-Penalty Time (mm:ss)"
	},
	"306": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #3-Number"
	},
	"308": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #3-Penalty Time (mm:ss)"
	},
	"316": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #4-Number"
	},
	"318": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #4-Penalty Time (mm:ss)"
	},
	"326": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #5-Number"
	},
	"328": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #5-Penalty Time (mm:ss)"
	},
	"336": {
		"length": 2,
			"justification": "R",
			"title": "Guest Player #6-Number"
	},
	"338": {
		"length": 8,
			"justification": "L",
			"title": "Guest Player #6-Penalty Time (mm:ss)"
	},
	"346": {
		"length": 1,
			"justification": "L",
			"title": "Home Penalty Indicator (' ' or '<')"
	},
	"347": {
		"length": 7,
			"justification": "L",
			"title": "Home Penalty Text-' ‘ or PENALTY"
	},
	"354": {
		"length": 1,
			"justification": "L",
			"title": "Guest Penalty Indicator (' ' or '>')"
	},
	"355": {
		"length": 7,
			"justification": "L",
			"title": "Guest Penalty Text-' ' or PENALTY"
	},
	"362": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 1"
	},
	"364": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 2"
	},
	"366": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 3"
	},
	"368": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 4"
	},
	"370": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 5"
	},
	"372": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 6"
	},
	"374": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 7"
	},
	"376": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 8"
	},
	"378": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Period 9"
	},
	"380": {
		"length": 2,
			"justification": "R",
			"title": "Home Score - Current Period"
	},
	"382": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 1"
	},
	"384": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 2"
	},
	"386": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 3"
	},
	"388": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 4"
	},
	"390": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 5"
	},
	"392": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 6"
	},
	"394": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 7"
	},
	"396": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 8"
	},
	"398": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Period 9"
	},
	"400": {
		"length": 2,
			"justification": "R",
			"title": "Guest Score - Current Period"
	},
	"402": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 1"
	},
	"404": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 2"
	},
	"406": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 3"
	},
	"408": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 4"
	},
	"410": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 5"
	},
	"412": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 6"
	},
	"414": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 7"
	},
	"416": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 8"
	},
	"418": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Period 9"
	},
	"420": {
		"length": 2,
			"justification": "R",
			"title": "Home Shots On Goal - Current"
	},
	"422": {
		"length": 3,
			"justification": "R",
			"title": "Home Shots On Goal - Total",
			handler: homeShotHandler
	},
	"425": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 1"
	},
	"427": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 2"
	},
	"429": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 3"
	},
	"431": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 4"
	},
	"433": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 5"
	},
	"435": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 6"
	},
	"437": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 7"
	},
	"439": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 8"
	},
	"441": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Period 9"
	},
	"443": {
		"length": 2,
			"justification": "R",
			"title": "Home Saves - Current"
	},
	"445": {
		"length": 3,
			"justification": "R",
			"title": "Home Saves - Total"
	},
	"448": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 1"
	},
	"450": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 2"
	},
	"452": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 3"
	},
	"454": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 4"
	},
	"456": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 5"
	},
	"458": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 6"
	},
	"460": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 7"
	},
	"462": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 8"
	},
	"464": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Period 9"
	},
	"466": {
		"length": 2,
			"justification": "R",
			"title": "Guest Shots On Goal - Current"
	},
	"468": {
		"length": 3,
			"justification": "R",
			"title": "Guest Shots On Goal - Total",
			handler: awayShotHandler
	},
	"471": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 1"
	},
	"473": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 2"
	},
	"475": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 3"
	},
	"477": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 4"
	},
	"479": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 5"
	},
	"481": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 6"
	},
	"483": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 7"
	},
	"485": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 8"
	},
	"487": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Period 9"
	},
	"489": {
		"length": 2,
			"justification": "R",
			"title": "Guest Saves - Current"
	},
	"491": {
		"length": 3,
			"justification": "R",
			"title": "Guest Saves - Total"
	}
}

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
