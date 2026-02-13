import {
	Router,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import passport from "passport";
import { authRouter } from "./auth/auth.routes";
import { AuthController } from "./auth/auth.controller";
import { userRouter } from "./entities/user/user.routes";
import { roomRouter } from "./entities/room/room.routes";
import { spaceRouter } from "./entities/space/space.routes";
import { pluginRouter } from "./plugins/plugin.routes";
import { RoomController } from "./entities/room/room.controller";
import { SpaceController } from "./entities/space/space.controller";
import { UserController } from "./entities/user/user.controller";
import { AuthState } from "./auth/auth.state";

export const apiRouter = Router();

apiRouter.use(passport.initialize());
apiRouter.use("/auth", authRouter, AuthController.handleUserProfile);
apiRouter.use(AuthController.middlewareAuth);

apiRouter.use("/user", userRouter);
apiRouter.use("/room", roomRouter);
apiRouter.use("/space", spaceRouter);

apiRouter.use(
	"/plugin/personal/:userId",
	UserController.authorizePersonal,
	addSourceId,
	pluginRouter,
);
apiRouter.use(
	"/plugin/direct/:spaceId",
	SpaceController.authorizeUser,
	addSourceId,
	pluginRouter,
);
apiRouter.use(
	"/plugin/club/:spaceId",
	SpaceController.authorizeUser,
	addSourceId,
	pluginRouter,
);
apiRouter.use(
	"/plugin/room/:roomId",
	RoomController.authorizeUser,
	addSourceId,
	pluginRouter,
);

function addSourceId(req: Request, _: Response, next: NextFunction) {
	AuthState.storeSourceId(req);
	next();
}
