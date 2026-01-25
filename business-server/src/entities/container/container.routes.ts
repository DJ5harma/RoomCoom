import { Router } from "express";
import { ContainerController } from "./container.controller";

export const containerRouter = Router();

containerRouter.post("/create", ContainerController.create);
containerRouter.get('/:containerId', ContainerController.get)