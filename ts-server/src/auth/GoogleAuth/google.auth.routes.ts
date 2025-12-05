import express from "express";
import { GoogleAuthController } from "./google.auth.controller";

const router = express.Router();

router.get("/config", GoogleAuthController.getConfig);
router.post("/signin", GoogleAuthController.signin);

export const GoogleAuthRouter = router;
