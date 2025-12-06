import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { GoogleAuthRouter } from "./auth/GoogleAuth/google.auth.routes";
import { ApiError } from "../utils/ApiError";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserRouter } from "./user/user.routes";
import { ErrorMiddleware } from "./middleware/error.middleware";

const PORT = parseInt(process.env.PORT ?? "4000");

export async function server() {
	const app = express();
	app.use(cookieParser());
	app.use(express.json());
	app.use(
		cors({
			origin: (process.env.CLIENT_ORIGINS as string).split(","),
			credentials: true,
		})
	);

	app.get("/error-format", (_, res) => {
		// res.send("TEST")
		// return;
		throw ApiError.internal("This is a sample error message");
	});

	app.get("/", (_, res) =>
		res.send("(:_______RoomCoom server is running________:)")
	);

	app.use("/api/auth/google", GoogleAuthRouter);

	// Apply auth middleware only to protected routes
	app.use("/api/user", AuthMiddleware.authenticate, UserRouter);

	// 404 handler for unknown routes (must be after all routes)
	app.use(ErrorMiddleware.NOT_FOUND_HANDLER);

	// Error handler (must be last)
	app.use(ErrorMiddleware.REST_HANDLER);

	app.listen(PORT, () => {
		console.log(
			" (: RoomCoom server is running @ " + "http://localhost" + PORT
		);
	});
}
