import { Router } from "express";
import { RoomController } from "./room.controller";
import { containerRouter } from "../container/container.routes";

export const roomRouter = Router();

roomRouter.post("/create", RoomController.createRoom);

roomRouter.use(RoomController.authorizeUser);

roomRouter.get("/:roomId/join", RoomController.joinRoom);
roomRouter.get("/:roomId/containers", RoomController.getContainers);

roomRouter.use("/:roomId/container", containerRouter);
