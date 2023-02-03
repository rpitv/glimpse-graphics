import {NodeCG} from "nodecg-types/types/server";
import {Request, Response} from "express"
import {replicants} from "../util/replicants";
import {methods} from "./method";

/**
 * The common API response is a json consisting of the HTTP status code and a short message.
 * @param res Express response
 * @param code the HTTP status code
 * @param msg a short informative phrase/sentence
 */
export const apiResponseV1 = (res: Response, code: number, msg: string): void => {
	res.status(code).json({code, msg});
};

/**
 * A panic API response, for use where the API encountered a state that it should not have.
 * @param req Express request
 * @param res Express response
 */
export const apiFatalPanik = (req: Request, res: Response): void => {
	apiResponseV1(res, 501, `FATAL ERROR: REPORT TO DEVS THIS URL IMMEDIATELY!!!!! ${req.url}`)
}

export const createApi = (nodecg: NodeCG): void => {
	const router = nodecg.Router();
	/**
	 * Version 1 of the REST API.
	 * Expects an API key a method and endpoint within the method.
	 */
	const v1_routes = [
		"/v1/:key/:method/:endpoint/:param1/:param2/:param3*",
		"/v1/:key/:method/:endpoint/:param1/:param2*",
		"/v1/:key/:method/:endpoint/:param1*",
		"/v1/:key/:method/:endpoint*",
		"/v1/:key/:method*",
		"/v1/:key*",
	]
	router.get(v1_routes, (req: Request, res: Response) => {
		if (req.params.key != replicants.gameSettings.api.key.value) {
			apiResponseV1(res, 401, "invalid key");
		} else if (!replicants.gameSettings.api.enabled.value) {
			apiResponseV1(res, 403, "api not enabled");
		} else if (!req.params.method) {
			apiResponseV1(res, 400, "missing method");
		} else if (!req.params.endpoint) {
			// the "docs" method does not require an endpoint
			if (req.params.method === "docs") {
				methods["docs"](req, res, "");
			} else {
				apiResponseV1(res, 400, "missing endpoint in method");
			}
		} else if (!methods[req.params.method]) {
			apiResponseV1(res, 400, "invalid method");
		} else {
			methods[req.params.method](req, res, req.params.endpoint);
		}
	});


	// return a 400 status since invalid path
	router.get("/*", (req: Request, res: Response) => {
		res.status(400).json({code: 400, msg: "invalid path"})
	});

	// mounts base router url at "localhost:PORT/glimpse-graphics-api"
	nodecg.mount("/glimpse-graphics-api", router);
};



