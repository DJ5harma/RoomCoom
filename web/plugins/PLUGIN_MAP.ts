import { DefaultyyPlugin } from "./_defaultyy/DefaultyyPlugin";
import { ChatyyPlugin } from "./chatyy/ChatyyPlugin";
import { DrawyyPlugin } from "./drawyy/DrawyyPlugin";
import { MeetyyPlugin } from "./meetyy/MeetyyPlugin";

export const PLUGIN_MAP = {
	defaultyy: { node: DefaultyyPlugin },
	drawyy: { node: DrawyyPlugin },
	chatyy: { node: ChatyyPlugin },
	meetyy: { node: MeetyyPlugin },
};
