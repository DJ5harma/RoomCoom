import type { Request, Response } from "express";
import type { uuid } from "../../../../types";
import { MessageService } from "../services/message.service";

class MessageControllerImpl {
	send(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const { content } = req.body;

		MessageService.sendToContainer({ containerId, content });
		res.send();
	}
	async get(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const messages = await MessageService.getForContainer(containerId);
		res.json(messages);
	}
}

export const MessageController = new MessageControllerImpl();
