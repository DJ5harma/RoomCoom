import { useChatyy } from "../ChatyyPlugin";
import { Message } from "./Message";

export const ChatBox = () => {
	const { messages } = useChatyy();

	return (
		<div className="w-full">
			<div className="flex flex-col gap-2 p-2">
				{messages.map((message, i) => {
					const isContinuation = i > 0 && message.from === messages[i - 1].from;
					return (
						<Message
							key={message.id}
							message={message}
							isContinuation={isContinuation}
						/>
					);
				})}
			</div>
		</div>
	);
};
