import { ChatBox } from "./components/ChatBox";
import { InputBox } from "./components/InputBox";
import { AutoScroller } from "./components/AutoScroller";

export function Chatyy() {
	return (
		<div className="w-full h-full flex flex-col bg-linear-to-r from-yellow-500 to-orange-800">
			<div
				className="overflow-auto h-full"
				style={{
					scrollbarWidth: "thin",
					scrollbarColor: "gray transparent",
				}}
			>
				<ChatBox />
				<AutoScroller />
			</div>
			<div>
				<InputBox />
			</div>
		</div>
	);
}
