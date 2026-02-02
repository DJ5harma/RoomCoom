import { useUser } from "@/context/user.context";
import { useChatyy } from "../chatyy.context";
import { Message } from "./Message";

export const ChatBox = () => {
	const { messages } = useChatyy();
	const { user } = useUser();
	return (
		<div className="w-full h-full">
			<div>
				{messages.map((message) => {
					const didISend = message.from === user.id;
					return (
						<div
							key={message.id}
							className={"w-full flex " + (didISend ? "justify-end" : "")}
						>
							<Message message={message} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
