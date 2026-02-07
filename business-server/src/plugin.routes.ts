import { Router } from "express";
import { chatyyRouter } from "./plugins/chatyy/routes";
import { meetyyRouter } from "./plugins/meetyy/routes";

export const pluginRouter = Router();

pluginRouter.use("/chatyy", chatyyRouter);
pluginRouter.use("/meetyy", meetyyRouter);
