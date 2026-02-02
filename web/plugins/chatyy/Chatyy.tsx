import { ChatBox } from "./components/ChatBox";
import { InputBox } from "./components/InputBox";

export function Chatyy() {
	return (
		<div className="w-full border border-cyan-100 max-h-screen flex flex-col">
			<div className="overflow-auto">
				<ChatBox />
			</div>
			<div>
				<InputBox />
			</div>
		</div>
	);
}
