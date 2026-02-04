import { Router } from "express";
import { PluginController } from "./plugin.controller";

export const PUBLIC_pluginRouter = Router();

PUBLIC_pluginRouter.get("/all", PluginController.getAll);
