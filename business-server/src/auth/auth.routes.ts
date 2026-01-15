import { Router } from "express";
import passport from "passport";
import { AppError } from "../error/AppError";

export const authRouter = Router();

authRouter.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
		failureRedirect: "/auth/failed",
	}),
	(req, res, next) => {
		res.send("GOOGLE 0AUTH success ")
	}
);
authRouter.get("/failed", (req, res) => {
	throw new AppError(401, "Authentication Failed");
});