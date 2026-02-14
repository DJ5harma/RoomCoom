import type { Socket } from "socket.io";
import type { uuid } from "../../types";
import { helper } from "../../helper";
import { redis } from "../../main";
import { DRAWYY_ALL_KEY } from "./DRAWYY_KEYS";

export function DrawyyIO(socket: Socket, sourceId: uuid) {
	helper.listenSignalSocket(
		socket,
		sourceId,
		"drawyy:element",
		({ key, element }) => {
			redis.hset(DRAWYY_ALL_KEY(sourceId), key, JSON.stringify(element));
			helper.sendSignalSocket(sourceId, "drawyy:element", { key, element });
		},
	);
	helper.listenSignalSocket(
		socket,
		sourceId,
		"drawyy:element:delete",
		({ key }) => {
			redis.hdel(DRAWYY_ALL_KEY(sourceId), key);
			helper.sendSignalSocket(sourceId, "drawyy:element:delete", { key });
		},
	);
	helper.listenSignalSocket(
		socket,
		sourceId,
		"drawyy:element:delete:all",
		() => {
			redis.del(DRAWYY_ALL_KEY(sourceId));
			helper.sendSignalSocket(sourceId, "drawyy:element:delete:all", {});
		},
	);
}
