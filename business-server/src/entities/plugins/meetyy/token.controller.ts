import type { Request, Response } from "express";
import type { uuid } from "../../../types";
import { AccessToken } from "livekit-server-sdk";
import { AuthState } from "../../../auth/auth.state";
import { ENV_CONSTANTS } from "../../../constants/env.constants";
import { UserService } from "../../user/user.service";

class TokenControllerImpl {
	getToken = async (req: Request, res: Response) => {
		const { instanceId } = req.params as { instanceId: uuid };
		const userId = AuthState.getUserId(req);

		const user = (await UserService.findById(userId))!;
		
		const liveToken = new AccessToken(
			ENV_CONSTANTS.LIVEKIT_API_KEY,
			ENV_CONSTANTS.LIVEKIT_API_SECRET,
			{ identity: user.name },
		);
		liveToken.addGrant({
			roomJoin: true,
			room: instanceId,
			canPublish: true,
			canSubscribe: true,
		});
		
		res.json({ liveToken: await liveToken.toJwt() });
	};
}

export const TokenController = new TokenControllerImpl();
