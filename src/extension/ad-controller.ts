import {replicants} from "./util/replicants";

let lastModified: number|null = null;

// Count down how much time is left in the ad segment.
replicants.ads.timeRemaining.on('change', async (newVal: number) => {
	if(newVal <= 0) {
		return;
	}
	if(lastModified == null) {
		lastModified = Date.now();
	}
	// NOTE: This setTimeout is never cancelled if the ad break is cut short or reset in any way. This is fine for now.
	await new Promise(resolve => setTimeout(resolve, 1000));
	// Update the time remaining by the amount of time that has passed since the last update.
	const now = Date.now();
	const diff = now - lastModified;
	lastModified = now;
	replicants.ads.timeRemaining.value -= diff / 1000;
	// If the time remaining is less than 0, set it to 0 and delete the lastModified timestamp.
	if(replicants.ads.timeRemaining.value < 0) {
		lastModified = null;
		replicants.ads.timeRemaining.value = 0;
	}
});
