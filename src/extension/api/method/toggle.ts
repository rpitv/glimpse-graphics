import {Replicant} from "nodecg-types/types/server";
import {Request, Response} from "express"
import {replicants} from "../../util/replicants";
import {apiResponseV1} from "../api"

function toggleOption(req: Request,res: Response, option: Replicant<boolean>) {
	if (req.params.param1) {
		if(req.params.param1 === "true") {
			option.value = true;
		} else if (req.params.param1 === "false") {
			option.value = false;
		}
	} else {
		option.value = !option.value;
	}
	apiResponseV1(res, 200, `toggled [${option.namespace}] (${option.name}) to ${option.value}`)
}

export const endpoints: { [key: string]: Replicant<boolean> } = {
	"lt-scoreboard": replicants.lowerThird.scoreboard,
	"lt-locator": replicants.lowerThird.locator,
	"bug": replicants.lowerThird.bug,
	"end-credits": replicants.lowerThird.endGraphics.show,
	"commentators": replicants.lowerThird.commentators.show,
	"main-scoreboard": replicants.scoreboard.visible,
	"copyright": replicants.lowerThird.showCopyright,
	"team_0_enable": replicants.teams[0].enabled,
	"team_1_enable": replicants.teams[1].enabled
}

/**
 * Inverts a boolean type replicant.
 * @param req Express request
 * @param res Express response
 * @param endpoint the key within "endpoints" to toggle
 */
export function handleToggle(req: Request, res: Response, endpoint: string): void {
	if (!endpoints[endpoint]) {
		apiResponseV1(res, 400, "invalid endpoint");
	} else {
		toggleOption(req, res, endpoints[endpoint]);
	}
}

