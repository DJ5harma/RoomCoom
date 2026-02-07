import { DefaultyyPlugin } from "./_defaultyy/DefaultyyPlugin";
import { ChatyyPlugin } from "./chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "./meetyy/MeetyyPlugin";

export const PLUGIN_MAP = {
	defaultyy: { node: DefaultyyPlugin },
	chatyy: { node: ChatyyPlugin },
	meetyy: { node: MeetyyPlugin },
};
