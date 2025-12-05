import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export async function server() {
	const app = express();
	app.use(cookieParser());
	app.use(express.json());
	app.use(
		cors({
			origin: (process.env.CLIENT_ORIGINS as string).split(","),
            credentials: true
		})
	);
}
