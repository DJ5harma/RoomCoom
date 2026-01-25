import { Router } from "express";
import { RoomController } from "./room.controller";

export const roomRouter = Router();

roomRouter.get('/:roomId/join', RoomController.joinRoom);
roomRouter.post('/create', RoomController.createRoom);