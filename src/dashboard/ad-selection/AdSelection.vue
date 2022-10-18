<template>
	<n-table>
		<thead>
		<tr>
			<th>Ad Name</th>
			<th>Preview</th>
			<th>Controls</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="ad in ads" :key="ad.sum">
			<td>
				{{ad.base}}
			</td>
			<td>
				<video :src="ad.url" controls />
			</td>
			<td>
				<n-button :type="ad.selected ? 'error' : 'success'" @click="ad.selected = !ad.selected">
					{{ad.selected ? 'Deselect' : 'Select'}}
				</n-button>
			</td>
		</tr>
		</tbody>
	</n-table>
</template>

<script setup lang="ts">
import {NTable, NButton} from "naive-ui";
import {loadReplicants} from "../../browser-common/replicants";
import {replicant} from "../../browser-common/replicant";

const replicants = await loadReplicants();

const ads = await replicant('assets:ads');
</script>

<style scoped lang="scss">
video {
	width: 250px;
	height: 140.6px;
}
</style>
