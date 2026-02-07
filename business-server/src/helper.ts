import type { Request } from "express";
import { io } from "./main";
import { AuthState } from "./auth/auth.state";

function sendSignal(req: Request, stream: string, payload: any) {
	const sourceId = AuthState.getSourceId(req);
	return io.to(sourceId).emit(`${sourceId}:${stream}`, payload);
}

export const helper = {
	sendSignal,
};
