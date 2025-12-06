import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/me", UserController.me);

export const UserRouter = router;
