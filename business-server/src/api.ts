import { Router } from "express";
import { PUBLIC_pluginRouter } from "./entities/plugins/plugin.routes";
import passport from "passport";
import { authRouter } from "./auth/auth.routes";
import { AuthController } from "./auth/auth.controller";
import { userRouter } from "./entities/user/user.routes";
import { roomRouter } from "./entities/room/room.routes";
import { spaceRouter } from "./entities/space/space.routes";
import { pluginRouter } from "./plugin.routes";
import { RoomController } from "./entities/room/room.controller";
import { SpaceController } from "./entities/space/space.controller";

export const apiRouter = Router();

apiRouter.use("/public/plugin", PUBLIC_pluginRouter);

apiRouter.use(passport.initialize());
apiRouter.use("/auth", authRouter, AuthController.handleUserProfile);
apiRouter.use(AuthController.middlewareAuth);

apiRouter.use("/user", userRouter);
apiRouter.use("/room", roomRouter);
apiRouter.use("/space", spaceRouter);

apiRouter.use("/plugin/personal", pluginRouter);
apiRouter.use(
    "/plugin/direct/:spaceId",
	SpaceController.authorizeUser,
	pluginRouter,
);
apiRouter.use(
    "/plugin/club/:spaceId",
    SpaceController.authorizeUser,
    pluginRouter,
);
apiRouter.use(
    "/plugin/room/:roomId",
    RoomController.authorizeUser,
    pluginRouter,
);
