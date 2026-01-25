import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.get("/me", UserController.getMe);
userRouter.get("/rooms", UserController.getRooms);
