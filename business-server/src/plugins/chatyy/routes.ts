import { Router } from "express";
import { MessageController } from "./message.controller";

export const chatyyRouter = Router({ mergeParams: true });

chatyyRouter.post("/storeMessage", MessageController.storeMessage);
chatyyRouter.get("/messages", MessageController.get);
