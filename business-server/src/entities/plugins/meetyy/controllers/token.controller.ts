import type { Request, Response } from "express";
import type { uuid } from "../../../../types";
import { AccessToken } from "livekit-server-sdk";
import { AuthState } from "../../../../auth/auth.state";
import { ENV_CONSTANTS } from "../../../../constants/env.constants";

class TokenControllerImpl {
	getToken = async (req: Request, res: Response) => {
		const { containerId } = req.params as { containerId: uuid };
		const userId = AuthState.getUserId(req);

		const liveToken = new AccessToken(
			ENV_CONSTANTS.LIVEKIT_API_KEY,
			ENV_CONSTANTS.LIVEKIT_API_SECRET,
			{ identity: userId },
		);
		liveToken.addGrant({
			roomJoin: true,
			room: containerId,
			canPublish: true,
			canSubscribe: true,
		});
		
		res.json({ liveToken: await liveToken.toJwt() });
	};
}

export const TokenController = new TokenControllerImpl();
