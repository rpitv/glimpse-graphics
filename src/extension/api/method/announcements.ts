import {Request, Response} from "express";
import {apiResponseV1} from "../api";
import {replicants} from "../../util/replicants";
import {Announcement} from "../../util/Announcement";
import {v4} from "uuid";
import {Replicant} from "nodecg-types/types/server";

/**
 * Add an announcement to the appropriate channel and responds to the HTTP request. <br>
 * NOTE: This means the Express response has already been sent here
 * and do NOT send another response further downstream.
 *
 * @param res Express response
 * @param type Is it a global, team0, or team1 announcement?
 * @param messageInput The message string to be displayed.
 * @param timerInput The length of the time to display the announcement for in ms or null for no specified time.
 * @param top If true inserts the new announcement at the top of the queue.
 */
function addAnnouncement(res: Response, type: Replicant<Announcement[]>, messageInput: string, timerInput: number | null, top = false) {
	const newAnnouncement: Announcement = {
		id: v4(),
		message: messageInput,
		type: "info", // TODO allow user to select type
		timer: timerInput ? {
			visible: true,
			startedAt: replicants.scoreboard.clock.time.value,
			length: timerInput,
			timerEndsAction: "removeAnnouncement"
		} : null,
	}

	if (top) {
		type.value = [newAnnouncement, ...type.value];
	} else {
		type.value = [...type.value, newAnnouncement];
	}
	apiResponseV1(res, 200, `created announcement '${messageInput}' in '${type.name}'`)
}

/**
 * Creates a message specific to each team.<br>
 *
 * <br> /v1/:key/:method/:endpoint/:param1/:param2/:param3
 * <br> param1 is team name (team1 | team2)
 * <br> param2 is the team specific message parameter
 * <br> param3 if is "top" then insert the global message at top of the queue, default inserts at the bottom
 *
 * @param req Express request
 * @param res Express response
 */
function teamSpecific(req: Request, res: Response): void {
	if (!req.params.param1) {
		apiResponseV1(res, 400, "missing destination team (team1 | team2)");
		return;
	}
	if (!req.params.param2) {
		apiResponseV1(res, 400, `missing message to display on team: '${req.params.param1}'`);
		return;
	}

	const parameter2: { [key: string]: { name: string, time: number | null } } = {
		"powerplay2": {name: "Power Play", time: (2 * 60 * 1000)},
		"powerplay5": {name: "Power Play", time: (5 * 60 * 1000)},
		"delayed_penalty": {name: "Delayed Penalty", time: null},
		"timeout": {name: "Timeout", time: null},
	};
	if (!parameter2[req.params.param2]) {
		apiResponseV1(res, 400, `'${req.params.param2}' is an invalid message to display on team: '${req.params.param1}'`);
		return;
	}

	const top = req.params.param3 === "top";
	const selected = parameter2[req.params.param2];
	if (req.params.param1 === "team1") {
		addAnnouncement(res, replicants.announcements.team1, selected.name, selected.time, top);
	} else if (req.params.param1 === "team2") {
		addAnnouncement(res, replicants.announcements.team2, selected.name, selected.time, top);
	} else {
		apiResponseV1(res, 400, `invalid team '${req.params.param1}'`);
	}
}

/**
 * Handles the global message creation. <br>
 *
 * <br> /v1/:key/:method/:endpoint/:param1/:param2
 * <br> param1 is the global message to display
 * <br> param2 if is "bottom" insert the global message at bottom of the queue, default inserts at the top
 *
 * @param req Express request
 * @param res Express response
 */
function handleGlobal(req: Request, res: Response): void {
	if (!req.params.param1) {
		apiResponseV1(res, 400, "missing global message parameter");
		return;
	}

	const parameter1: { [key: string]: string } = {
		"official_review": "Official Review",
		"empty_net": "Empty Net",
		"4on4": "4 on 4",
		"3on3": "3 on 3",
		"3on5": "3 on 5",
		"5on3": "5 on 3"
	}

	const bottom = req.params.param2 === "bottom";
	if (parameter1[req.params.param1]) {
		addAnnouncement(res, replicants.announcements.global, parameter1[req.params.param1], null, !bottom);
	} else {
		apiResponseV1(res, 400, `invalid global announcement param: '${req.params.param1}'`);
	}
}

export const endpointsAnnouncements: { [key: string]: (req: Request, res: Response) => void } = {
	"team_specific": teamSpecific,
	"global": handleGlobal
}

/**
 * Handles creating announcements for global and team specific cases. <br>
 * See the corresponding endpoint for further details on each endpoint's specific parameters.
 *
 * @param req
 * @param res
 * @param endpoint
 */
export function handleAnnouncements(req: Request, res: Response, endpoint: string): void {
	if (!endpointsAnnouncements[endpoint]) {
		apiResponseV1(res, 400, `invalid endpoint in announcements '${endpoint}'`);
	} else {
		endpointsAnnouncements[endpoint](req, res);
	}
}
