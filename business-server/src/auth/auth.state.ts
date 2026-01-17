import type { Request } from "express";

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
		console.log({ userId });
		AuthState.storeState(req, "userId", userId);
	}
	getUserId(req: Request) {
		return AuthState.getState(req, "userId") as string;
	}
}
export const AuthState = new AuthStateImpl();
