import { io } from "../../../../main";
import type { uuid } from "../../../../types";
import { MESSAGE } from "../models/message.model";

class MessageServiceImpl {
	sendToInstance = async ({
		instanceId,
		content,
		from,
	}: {
		instanceId: uuid;
		content: string;
		from: uuid;
	}) => {
		const message = await MESSAGE.create({
			content,
			instance: instanceId,
			from,
		});
		io.to(instanceId).emit("chatyy:message", { message });
	};

	getForInstance = async (instanceId: uuid) => {
		const messages = await MESSAGE.find({ instance: instanceId });
		return messages;
	};
}

export const MessageService = new MessageServiceImpl();
