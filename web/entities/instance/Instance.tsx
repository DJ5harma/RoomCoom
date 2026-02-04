import { useInstance } from "./InstanceProvider";
import { ChatyyPlugin } from "../plugins/chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "../plugins/meetyy/MeetyyPlugin";

export const Instance = () => {
	const { instance } = useInstance();

	if (instance.plugin.location === "external") {
		return <>External Plugin support to be added</>;
	}

	switch (instance.plugin.name) {
		case "chatyy":
			return <ChatyyPlugin />;
		case "meetyy":
			return <MeetyyPlugin />;
		default:
			return <>No plugin got deduced mapped for instance: {JSON.stringify(instance)}</>;
	}
};
