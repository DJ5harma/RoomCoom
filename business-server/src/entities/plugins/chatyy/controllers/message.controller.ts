import type { Request, Response } from "express";
import type { uuid } from "../../../../types";
import { MessageService } from "../services/message.service";
import { AuthState } from "../../../../auth/auth.state";

class MessageControllerImpl {
	send(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const { content } = req.body;

		const userId = AuthState.getUserId(req);
		MessageService.sendToInstance({ instanceId, content, from: userId });
		res.send();
	}
	async get(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const messages = await MessageService.getForInstance(instanceId);
		res.json({ messages });
	}
}

export const MessageController = new MessageControllerImpl();
