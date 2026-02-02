import { ChatBox } from "./components/ChatBox";
import { InputBox } from "./components/InputBox";

export function Chatyy() {
	return (
		<div className="w-full border border-cyan-100 h-full flex flex-col items-center">
			<ChatBox />
			<InputBox />
		</div>
	);
}
