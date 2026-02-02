import { Router } from "express";
import { TokenController } from "./controllers/token.controller";

export const meetyyRouter = Router({ mergeParams: true });

meetyyRouter.get("/live-token", TokenController.getToken);
