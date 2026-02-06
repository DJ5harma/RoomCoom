import type { Request } from "express";
import type { Socket } from "socket.io";
import type { uuid } from "../types";

interface ModdedRequest extends Request {
	state: { [key: string]: string | object };
}
class AuthStateImpl {
	private storeState(req: Request, stateKey: string, data: string | object) {
		if (!(req as ModdedRequest).state) (req as ModdedRequest).state = {};
		(req as ModdedRequest).state[stateKey] = data;
	}
	private getState(req: Request, stateKey: string) {
		return (req as ModdedRequest).state[stateKey];
	}
	storeUserId(req: Request, userId: string) {
		AuthState.storeState(req, "userId", userId);
	}
	getUserId(req: Request) {
		return AuthState.getState(req, "userId") as string;
	}
	storeUserIdSocket(socket: Socket, userId: uuid) {
		socket.data.userId = userId;
	}
	getUserIdSocket(socket: Socket) {
		return socket.data.userId as uuid;
	}
}
export const AuthState = new AuthStateImpl();
