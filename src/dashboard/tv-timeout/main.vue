<template>
	<n-config-provider :theme="darkTheme">
		<Suspense>
			<TvTimeout />
			<template #fallback>
				Loading...
			</template>
		</Suspense>
	</n-config-provider>
</template>

<script setup lang="ts">

import {NConfigProvider, darkTheme} from "naive-ui";
import TvTimeout from "./TvTimeout.vue";
</script>

<style scoped lang="scss">
</style>
