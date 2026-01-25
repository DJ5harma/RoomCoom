import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";
import { RoomService } from "./room.service";

export function RoomIO(socket: Socket){
    const userId = AuthState.getUserIdSocket(socket);
    socket.on("room:connect", async ({roomId}) => {
        const existsInRoom = await RoomService.userExistsInRoom(userId, roomId);
        if(!existsInRoom) return;
        socket.join(roomId);
    })
    socket.on("room:disconnect", async ({roomId}) => {
        socket.leave(roomId);
    })
}