import type { Request } from "express";
import { io } from "./main";
import { AuthState } from "./auth/auth.state";
import type { uuid } from "./types";
import type { Socket } from "socket.io";

function sendSignal(req: Request, stream: string, payload: any) {
	const sourceId = AuthState.getSourceId(req);
	return io.to(sourceId).emit(`${sourceId}:${stream}`, payload);
}

function sendSignalSocket(sourceId: uuid, stream: string, payload: any) {
	return io.to(sourceId).emit(`${sourceId}:${stream}`, payload);
}

function listenSignalSocket(
	socket: Socket,
	sourceId: uuid,
	stream: string,
	listener: (payload: any) => void,
) {
	return socket.on(`${sourceId}:${stream}`, listener);
}

export const helper = {
	sendSignal,
	sendSignalSocket,
	listenSignalSocket,
};
