import { Chatyy } from "@/plugins/chatyy/Chatyy";
import { ChatyyProvider } from "@/plugins/chatyy/chatyy.context";
import { Meetyy } from "@/plugins/meetyy/Meetyy";
import { MeetyyProvider } from "@/plugins/meetyy/meetyy.context";
import { useSearchParams } from "next/navigation";

export const RenderCorrectPlugin = () => {
	const searchParams = useSearchParams();
	const currentPlugin = (searchParams.get("plugin") ?? "chatyy") as string;

	const arr = [
		{
			plugin: "chatyy",
			elem: (
				<ChatyyProvider>
					<Chatyy />
				</ChatyyProvider>
			),
		},
		{
			plugin: "meetyy",
			elem: (
				<MeetyyProvider>
					<Meetyy />
				</MeetyyProvider>
			),
		},
	];

	return (
		<div className="w-full h-full relative">
			{arr.map(({ plugin, elem }) => {
				return (
					<div
						key={plugin}
						className={
							"absolute top-0 left-0 w-full h-full " +
							(currentPlugin === plugin ? "" : "hidden")
						}
					>
						{elem}
					</div>
				);
			})}
		</div>
	);
};
