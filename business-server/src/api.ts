import { Router } from "express";
import { PUBLIC_pluginRouter } from "./entities/plugins/plugin.routes";
import passport from "passport";
import { authRouter } from "./auth/auth.routes";
import { AuthController } from "./auth/auth.controller";
import { userRouter } from "./entities/user/user.routes";
import { roomRouter } from "./entities/room/room.routes";
import { spaceRouter } from "./entities/space/space.routes";

export const apiRouter = Router();

apiRouter.use("/public/plugin", PUBLIC_pluginRouter);

apiRouter.use(passport.initialize());
apiRouter.use("/auth", authRouter, AuthController.handleUserProfile);
apiRouter.use(AuthController.middlewareAuth);

apiRouter.use("/user", userRouter);
apiRouter.use("/room", roomRouter);
apiRouter.use("/space", spaceRouter);
