import { Router } from "express";
import { InstanceController } from "./instance.controller";
import { chatyyRouter } from "../plugins/chatyy/routes";
import { meetyyRouter } from "../plugins/meetyy/routes";
import { RoomController } from "../room/room.controller";

export const instanceRouter = Router({ mergeParams: true });

instanceRouter.post(
	"/",
	RoomController.authorizeUser,
	InstanceController.create,
);

instanceRouter.use("/:instanceId", InstanceController.authorizeUser);

instanceRouter.get("/:instanceId", InstanceController.get);

instanceRouter.post("/:instanceId/sendToAll", InstanceController.sendToAll)
instanceRouter.post("/:instanceId/sendToOne", InstanceController.sendToOne)
instanceRouter.post("/:instanceId/sendToSome", InstanceController.sendToSome)

instanceRouter.use("/:instanceId/chatyy", chatyyRouter);
instanceRouter.use("/:instanceId/meetyy", meetyyRouter);
