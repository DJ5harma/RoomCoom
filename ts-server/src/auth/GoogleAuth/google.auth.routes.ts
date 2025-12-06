import express from "express";
import { GoogleAuthController } from "./google.auth.controller";
import { UserController } from "../../user/user.controller";

const router = express.Router();

router.get("/config", GoogleAuthController.getConfig);
router.post("/signin", GoogleAuthController.signin, UserController.signin);

export const GoogleAuthRouter = router;
