import { Router } from "express";
import { chatyyRouter } from "./chatyy/routes";
import { meetyyRouter } from "./meetyy/routes";
import { drawyyRouter } from "./drawyy/routes";

export const pluginRouter = Router();

pluginRouter.use("/chatyy", chatyyRouter);
pluginRouter.use("/meetyy", meetyyRouter);
pluginRouter.use("/drawyy", drawyyRouter);
