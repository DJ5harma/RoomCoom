import { Router } from "express";
import { io } from "../../../main";
import type { Data, uuid } from "../../../types";

export const testRouter = Router({ mergeParams: true });

testRouter.post("/sendMessage", (req, res) => {
	const { roomId } = req.params as { roomId: uuid };
	const { data } = req.body as { data: Data };
	io.to(roomId).emit("test:message", data);
	res.send();
});
