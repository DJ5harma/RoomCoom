import { Router } from "express";
import { redis } from "../../main";
import { AuthState } from "../../auth/auth.state";
import { DRAWYY_ALL_KEY } from "./DRAWYY_KEYS";

export const drawyyRouter = Router({ mergeParams: true });

drawyyRouter.get("/all", async (req, res) => {
	const sourceId = AuthState.getSourceId(req);
	const allUnparsed = await redis.hgetall(DRAWYY_ALL_KEY(sourceId));

	const all: { [key: string]: any } = {};
	Object.entries(allUnparsed).forEach(([key, val]) => {
		all[key] = { element: JSON.parse(val!) };
	});
	res.json({ all });
});
