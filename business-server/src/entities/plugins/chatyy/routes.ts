import { Router } from "express";
import { MessageController } from "./controllers/message.controller";

export const chatyyRouter = Router({ mergeParams: true });

chatyyRouter.post("/send", MessageController.send);
chatyyRouter.get("/get", MessageController.get);
