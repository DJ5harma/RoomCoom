import { Router } from "express";
import { UserService } from "./user.service";
import { AuthState } from "../../auth/auth.state";

export const userRouter = Router();

userRouter.get("/me", async (req, res) => {
	const userId = AuthState.getUserId(req);
	const user = await UserService.findById(userId);
	res.json({ user });
});
