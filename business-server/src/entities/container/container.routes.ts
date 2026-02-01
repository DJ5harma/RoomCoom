import { Router } from "express";
import { ContainerController } from "./container.controller";
import { testRouter } from "../plugins/test/test.routes";

export const containerRouter = Router();

containerRouter.post("/create", ContainerController.create);

containerRouter.use(ContainerController.authorizeUser);

containerRouter.get("/:containerId", ContainerController.get);

containerRouter.get("/:containerId/test", testRouter);