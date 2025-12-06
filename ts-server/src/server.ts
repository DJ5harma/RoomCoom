import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { GoogleAuthRouter } from "./auth/GoogleAuth/google.auth.routes";
import { ApiError } from "../utils/ApiError";
import { AuthMiddleware } from "./middleware/auth.middleware";
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

	app.use(ErrorMiddleware.REST_HANDLER);

	app.get("/error-format", () => {
		throw ApiError.internal("This is a sample error message");
	});
	app.get("/", (_, res) =>
		res.send("(:_______RoomCoom server is running________:)")
	);

	app.use("/api/auth/google", GoogleAuthRouter);

	app.use(AuthMiddleware.authenticate);

	app.listen(PORT, () => {
		console.log(
			" (: RoomCoom server is running @ " + "http://localhost" + PORT
		);
	});
}
