import { useChatyy } from "../chatyy.context";
import { Message } from "./Message";

export const ChatBox = () => {
	const { messages } = useChatyy();
	return (
		<div className="w-full h-full">
			<div className="flex flex-col gap-2 p-2">
				{messages.map((message) => {
					return <Message key={message.id} message={message} />;
				})}
			</div>
		</div>
	);
};
