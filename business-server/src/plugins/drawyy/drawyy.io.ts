import type { Socket } from "socket.io";
import type { uuid } from "../../types";
import { helper } from "../../helper";

export function DrawyyIO(socket: Socket, sourceId: uuid) {
	helper.listenSignalSocket(socket, sourceId, "drawyy:element", (data) => {
		helper.sendSignalSocket(sourceId, "drawyy:element", data);
	});
}
