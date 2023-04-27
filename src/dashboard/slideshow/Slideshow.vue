<template>
<!--	<draggable v-model="images" item-key="id">-->
<!--		<template #item="{element: image}">-->
<!--			<v-img :src="image." width="300px" aspect-ratio="1/1"/>-->
<!--		</template>-->
<!--	</draggable>-->
	<v-table>
		<thead>
			<tr>
				<th class="text-left">
					Name
				</th>
				<th class="text-left">
					Image
				</th>
				<th>
					In slideshow
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="image in images">
				<td> {{image.base}} </td>
				<td><img :src="image.url"></td>
			</tr>
		</tbody>
	</v-table>
</template>

<script lang="ts" setup>
import {replicant} from "../../browser-common/replicant";
import {loadReplicants} from "../../browser-common/replicants";
import draggable from "vuedraggable";


const replicants = await loadReplicants();
const images = await replicant('assets:slideshow');


</script>
<style scoped lang="scss">
img {
	width: 100%;
	aspect-ratio: 16/9;
}
</style>
