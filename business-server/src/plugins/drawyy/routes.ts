import { Router } from "express";
import { redis } from "../../main";
import { AuthState } from "../../auth/auth.state";
import { DRAWYY_ALL_KEY } from "./DRAWYY_KEYS";

export const drawyyRouter = Router({ mergeParams: true });

drawyyRouter.get("/all", async (req, res) => {
	const sourceId = AuthState.getSourceId(req);
	const allUnparsed = (await redis.lrange(
		DRAWYY_ALL_KEY(sourceId),
		0,
		-1,
	)) as string[];
	const all = allUnparsed.map((up) => JSON.parse(up));
	res.json({ all });
});
