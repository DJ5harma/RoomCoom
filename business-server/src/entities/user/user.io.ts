import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";

export function UserIO(socket: Socket){
    const userId = AuthState.getUserIdSocket(socket);
    socket.join(userId);
}