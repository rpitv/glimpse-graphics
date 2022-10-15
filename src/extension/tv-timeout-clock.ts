import {replicants} from "./util/replicants";

let tvTimeoutTimer: NodeJS.Timer | null = null;
let tvTimeoutTimerLastModified: number | null = null;

replicants.ads.tvTimeout.isRunning.on('change', (newValue: boolean) => {
	// If isRunning is set to true, but the clock is already running, or vice versa, then do nothing.
	if((newValue && tvTimeoutTimer !== null) || (!newValue && tvTimeoutTimer === null)) {
		return;
	}

	if(newValue) {
		tvTimeoutTimerLastModified = Date.now();

		tvTimeoutTimer = setInterval(() => {
			// Stop the clock once it hits zero.
			if(replicants.ads.tvTimeout.currentTime.value <= 0) {
				replicants.ads.tvTimeout.isRunning.value = false;
				return;
			}

			// If clock hasn't hit zero yet, update its value.
			const now = Date.now();
			if(tvTimeoutTimerLastModified !== null) {
				replicants.ads.tvTimeout.currentTime.value -= (now - tvTimeoutTimerLastModified) / 1000;
				if(replicants.ads.tvTimeout.currentTime.value < 0) {
					replicants.ads.tvTimeout.currentTime.value = 0;
				}
			}
			tvTimeoutTimerLastModified = now;
		}, 1000);
	} else {
		if(tvTimeoutTimer !== null) {
			clearInterval(tvTimeoutTimer);
			tvTimeoutTimer = null;
		}
		tvTimeoutTimerLastModified = null;
		replicants.ads.tvTimeout.currentTime.value = replicants.ads.tvTimeout.length.value;
	}
})
