import { Router } from "express";
import { SpaceController } from "./space.controller";
import { RoomController } from "../room/room.controller";

export const spaceRouter = Router({ mergeParams: true });

spaceRouter.post("/", RoomController.authorizeUser, SpaceController.create);

spaceRouter.use("/:spaceId", SpaceController.authorizeUser);

spaceRouter.get("/:spaceId", SpaceController.get);
