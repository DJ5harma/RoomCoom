import { Chatyy } from "@/entities/plugins/chatyy/Chatyy";
import { ChatyyProvider } from "@/entities/plugins/chatyy/ChatyyProvider";
import { Meetyy } from "@/entities/plugins/meetyy/Meetyy";
import { MeetyyProvider } from "@/entities/plugins/meetyy/MeetyyProvider";
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
