<template>
	<n-config-provider :theme="darkTheme">
		<Suspense>
			<AdSelection />
			<template #fallback>
				Loading...
			</template>
		</Suspense>
	</n-config-provider>
</template>

<script setup lang="ts">

import {NConfigProvider, darkTheme} from "naive-ui";
import AdSelection from "./AdSelection.vue";
</script>

<style scoped lang="scss">
</style>
