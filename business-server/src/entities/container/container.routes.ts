import { Router } from "express";
import { ContainerController } from "./container.controller";
import { testRouter } from "../plugins/test/test.routes";
import { chatyyRouter } from "../plugins/chatyy/routes";

export const containerRouter = Router({ mergeParams: true });

containerRouter.post("/create", ContainerController.create);

containerRouter.use("/:containerId", ContainerController.authorizeUser);

containerRouter.get("/:containerId", ContainerController.get);
containerRouter.get("/:containerId/members", ContainerController.getMembers);

containerRouter.use("/:containerId/test", testRouter);
containerRouter.use("/:containerId/chatyy", chatyyRouter);
