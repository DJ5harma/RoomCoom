import { Router } from "express";
import { ContainerController } from "./container.controller";
import { chatyyRouter } from "../plugins/chatyy/routes";
import { meetyyRouter } from "../plugins/meetyy/routes";

export const containerRouter = Router({ mergeParams: true });

containerRouter.post("/create", ContainerController.create);

containerRouter.use("/:containerId", ContainerController.authorizeUser);

containerRouter.get("/:containerId", ContainerController.get);
containerRouter.get("/:containerId/members", ContainerController.getMembers);

containerRouter.use("/:containerId/chatyy", chatyyRouter);
containerRouter.use("/:containerId/meetyy", meetyyRouter);
