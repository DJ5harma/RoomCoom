import { Router } from "express";
import { chatyyRouter } from "./entities/plugins/chatyy/routes";
import { meetyyRouter } from "./entities/plugins/meetyy/routes";

export const pluginRouter = Router();

pluginRouter.use("/chatyy", chatyyRouter);
pluginRouter.use("/meetyy", meetyyRouter);
