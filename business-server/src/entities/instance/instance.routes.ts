import { Router } from "express";
import { InstanceController } from "./instance.controller";
import { chatyyRouter } from "../plugins/chatyy/routes";
import { meetyyRouter } from "../plugins/meetyy/routes";

export const instanceRouter = Router({ mergeParams: true });

instanceRouter.post("/create", InstanceController.create);

instanceRouter.use("/:instanceId", InstanceController.authorizeUser);

instanceRouter.get("/:instanceId", InstanceController.get);
instanceRouter.get("/:instanceId/members", InstanceController.getMembers);

instanceRouter.use("/:instanceId/chatyy", chatyyRouter);
instanceRouter.use("/:instanceId/meetyy", meetyyRouter);
