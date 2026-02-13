import type { Socket } from "socket.io";
import type { uuid } from "../../types";
import { helper } from "../../helper";
import { redis } from "../../main";
import { DRAWYY_ALL_KEY } from "./DRAWYY_KEYS";

export function DrawyyIO(socket: Socket, sourceId: uuid) {
	helper.listenSignalSocket(socket, sourceId, "drawyy:element", (data) => {
		redis.rpush(DRAWYY_ALL_KEY(sourceId), JSON.stringify(data));
		helper.sendSignalSocket(sourceId, "drawyy:element", data);
	});
}
