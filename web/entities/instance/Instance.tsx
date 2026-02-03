import { useInstance } from "./InstanceProvider";
import { PluginEnum } from "@/utils/types";
import { ChatyyPlugin } from "../plugins/chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "../plugins/meetyy/MeetyyPlugin";

export const Instance = () => {
	const { instance } = useInstance();

	switch (instance.plugin) {
		case PluginEnum.chatyy:
			return <ChatyyPlugin />;
		case PluginEnum.meetyy:
			return <MeetyyPlugin />;
		default:
			return <></>;
	}
};
