import type { Socket } from "socket.io";
import type { uuid } from "./types";
import { DrawyyIO } from "./plugins/drawyy/drawyy.io";

export const PLUGIN_HANDLERS: ((socket: Socket, sourceId: uuid) => void)[] = [
	DrawyyIO,
];
