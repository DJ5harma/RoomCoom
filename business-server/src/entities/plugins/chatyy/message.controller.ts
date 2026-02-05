import type { Request, Response } from "express";
import type { uuid } from "../../../types";
import { AuthState } from "../../../auth/auth.state";
import { MESSAGE } from "./message.model";

class MessageControllerImpl {
	async storeMessage(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const { content } = req.body;

		const userId = AuthState.getUserId(req);
		const message = await MESSAGE.create({
			content,
			instance: instanceId,
			from: userId,
		});
		res.json({ message });
	}
	async get(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const messages = await MESSAGE.find({ instance: instanceId });
		res.json({ messages });
	}
}

export const MessageController = new MessageControllerImpl();
