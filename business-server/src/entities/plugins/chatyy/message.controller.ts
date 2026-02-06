import type { Request, Response } from "express";
import { AuthState } from "../../../auth/auth.state";
import { MESSAGE } from "./message.model";

class MessageControllerImpl {
	async storeMessage(req: Request, res: Response) {
		const sourceId = AuthState.getSourceId(req);
		const { content } = req.body;

		const userId = AuthState.getUserId(req);
		const message = await MESSAGE.create({
			content,
			source: sourceId,
			from: userId,
		});
		res.json({ message });
	}
	async get(req: Request, res: Response) {
		const sourceId = AuthState.getSourceId(req);
		const messages = await MESSAGE.find({ source: sourceId }).populate("from");
		res.json({ messages });
	}
}

export const MessageController = new MessageControllerImpl();
