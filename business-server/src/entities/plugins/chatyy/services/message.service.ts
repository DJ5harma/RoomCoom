import { io } from "../../../../main";
import type { uuid } from "../../../../types";
import { MESSAGE } from "../models/message.model";

class MessageServiceImpl {
	sendToContainer = async ({
		containerId,
		content,
		from,
	}: {
		containerId: uuid;
		content: string;
		from: uuid;
	}) => {
		const message = await MESSAGE.create({
			content,
			container: containerId,
			from,
		});
		io.to(containerId).emit("chatyy:message", { message });
	};

	getForContainer = async (containerId: uuid) => {
		const messages = await MESSAGE.find({ container: containerId });

		return messages;
	};
}

export const MessageService = new MessageServiceImpl();
