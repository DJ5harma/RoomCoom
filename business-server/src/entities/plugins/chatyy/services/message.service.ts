import { io } from "../../../../main";
import type { uuid } from "../../../../types";
import { MESSAGE } from "../models/message.model";

const populateOptions = "from";

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
		const { id } = await MESSAGE.create({
			content,
			instance: instanceId,
			from,
		});
		const message = await MESSAGE.findById(id).populate(populateOptions);
		io.to(instanceId).emit("chatyy:message", { message });
	};

	getForInstance = async (instanceId: uuid) => {
		const messages = await MESSAGE.find({ instance: instanceId }).populate(
			populateOptions,
		);

		return messages;
	};
}

export const MessageService = new MessageServiceImpl();
