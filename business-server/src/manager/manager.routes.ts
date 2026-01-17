import { Router } from "express";
import { ManagerController } from "./manager.controller";

export const managerRouter = Router();

managerRouter.get("/my-rooms", ManagerController.getMyRooms);
managerRouter.get("/get-room/:roomId", ManagerController.getRoom);

managerRouter.post("/create-room", ManagerController.createRoom);

managerRouter.post(
	"/room/:roomId/create-group",
	ManagerController.authorizeUserRoomAccess,
	ManagerController.createGroup,
);
