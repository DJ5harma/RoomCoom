import { Chatyy } from "@/plugins/chatyy/Chatyy";
import { ChatyyProvider } from "@/plugins/chatyy/chatyy.context";
import { Meetyy } from "@/plugins/meetyy/Meetyy";
import { MeetyyProvider } from "@/plugins/meetyy/meetyy.context";
import { useInstance } from "./InstanceProvider";
import { PluginEnum } from "@/utils/types";

export const RenderCorrectPlugin = () => {
	const { instance } = useInstance();

	switch (instance.plugin) {
		case PluginEnum.meetyy:
			return (
				<MeetyyProvider>
					<Meetyy />
				</MeetyyProvider>
			);
		case PluginEnum.chatyy:
		default:
			return (
				<ChatyyProvider>
					<Chatyy />
				</ChatyyProvider>
			);
	}
};
