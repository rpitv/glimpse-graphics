<template>
	<n-config-provider :theme="darkTheme">
		<Suspense>
			<AdPlayout />
			<template #fallback>
				Loading...
			</template>
		</Suspense>
	</n-config-provider>
</template>

<script setup lang="ts">

import {NConfigProvider, darkTheme} from "naive-ui";
import AdPlayout from "./AdPlayout.vue";
</script>

<style scoped lang="scss">
</style>
