import type { Request, Response } from "express";
import type { uuid } from "../../../../types";
import { MessageService } from "../services/message.service";
import { AuthState } from "../../../../auth/auth.state";

class MessageControllerImpl {
	send(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const { content } = req.body;

		const userId = AuthState.getUserId(req);
		MessageService.sendToContainer({ containerId, content, from: userId });
		res.send();
	}
	async get(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const messages = await MessageService.getForContainer(containerId);
		res.json({ messages });
	}
}

export const MessageController = new MessageControllerImpl();
