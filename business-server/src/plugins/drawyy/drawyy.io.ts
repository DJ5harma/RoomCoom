import type { Socket } from "socket.io";
import type { uuid } from "../../types";
import { io } from "../../main";

export function DrawyyIO(sourceId: uuid, socket: Socket) {
	socket.on("drawyy:element", (data) => {
        // console.log({data});
        
		io.to(sourceId).emit("drawyy:element", data);
	});
}
