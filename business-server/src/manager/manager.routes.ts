import { Router } from "express";
import { ManagerController } from "./manager.controller";
import { ManagerAccess } from "./manager.access";

export const managerRouter = Router();

managerRouter.get("/my-rooms", ManagerController.getMyRooms);
managerRouter.get("/get-room/:roomId", ManagerController.getRoom);

managerRouter.post("/create-room", ManagerController.createRoom);

managerRouter.post(
	"/room/:roomId/create-group",
	ManagerAccess.authorizeUserRoomAccess,
	ManagerController.createGroup,
);

managerRouter.post(
	"/room/:roomId/group/:groupId/add-member",
	ManagerAccess.authorizeUserRoomAccess,
	ManagerAccess.authorizeUserGroupAccess,
	ManagerController.addMemberToGroup,
);
