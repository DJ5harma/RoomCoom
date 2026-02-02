import { ChatBox } from "./components/ChatBox";
import { InputBox } from "./components/InputBox";
import { AutoScroller } from "./components/AutoScroller";
import { useSearchParams } from "next/navigation";

export function Chatyy() {
	const searchParams = useSearchParams();
	const plugin = searchParams.get("plugin");
	const render = plugin === "chatyy" || plugin === null;
	if (!render) return;
	return (
		<div className="w-full h-full border border-cyan-100 max-h-screen flex flex-col">
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
