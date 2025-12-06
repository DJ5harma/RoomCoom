import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { GoogleAuthRouter } from "./auth/GoogleAuth/google.auth.routes";
import { ApiError } from "../utils/ApiError";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserRouter } from "./entities/user/user.routes";
import { ErrorMiddleware } from "./middleware/error.middleware";

const PORT = parseInt(process.env.PORT ?? "4000");

export async function server() {
	const app = express();
	app.use(cookieParser());
	app.use(express.json());
	const clientOrigins = process.env.CLIENT_ORIGINS
		? (process.env.CLIENT_ORIGINS as string).split(",")
		: ["http://localhost:3000", "http://localhost:3001"];

	app.use(
		cors({
			origin: (origin, callback) => {
				// Allow requests with no origin (like mobile apps or curl requests)
				if (!origin) {
					callback(null, true);
					return;
				}
				if (clientOrigins.includes(origin)) {
					callback(null, true);
				} else {
					// In development, log the origin for debugging
					if (process.env.NODE_ENV !== "production") {
						console.log(
							`CORS: Origin ${origin} not in allowed list:`,
							clientOrigins
						);
					}
					callback(null, false);
				}
			},
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
		})
	);

	app.get("/error-format", () => {
		throw ApiError.internal("This is a sample error message");
	});
	app.get("/set-cookie", (_, res) => {
		const isProduction = process.env.NODE_ENV === "production";
		res.cookie("access-token", "1234567890", {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "strict" : "lax",
			maxAge: 10 * 60 * 1000,
		});
		res.cookie("refresh-token", "1234567890", {
			httpOnly: true,
			secure: isProduction,
			sameSite: isProduction ? "strict" : "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		res.send("Cookie set");
	});

	// Debug endpoint to check cookies
	app.get("/debug-cookies", (req, res) => {
		res.json({
			cookies: req.cookies,
			headers: {
				cookie: req.headers.cookie,
			},
		});
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
			" (: RoomCoom server is running @ " + "http://localhost:" + PORT
		);
	});
}
