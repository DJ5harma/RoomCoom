import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AppError } from "./error/AppError";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./auth/auth.initializer";
import { ENV_CONSTANTS } from "./constants/env.constants";
import mongoose from "mongoose";
import morgan from "morgan";
import { AuthService } from "./auth/auth.service";
import { AuthState } from "./auth/auth.state";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { apiRouter } from "./api";

const app = express();
const server = http.createServer(app);

app.use(
	cors({
		credentials: true,
		origin: [ENV_CONSTANTS.WEB_URL],
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));

app.get("/", (_req, res) => res.send("hello"));
app.get("/err", () => {
	throw new Error("ERROR HANDLER WORKS CORRECTLY - OK");
});

app.use("/api", apiRouter);

app.use(AppError.ExpressErrorHandler);

export const redis = new Redis();
const redisSubClient = redis.duplicate();

const io = new Server(server, {
	adapter: createAdapter(redis, redisSubClient),
});

const PORT = process.env.PORT!;

mongoose.connect(ENV_CONSTANTS.MONGO_URI).then(() => {
	console.log("MongoDB connected");
	server.listen(PORT, () => {
		console.log(`socket.io server: ${ENV_CONSTANTS.MY_URL}`);
	});
});

io.on("connection", (socket) => {
	console.log("Connected", socket.id);

	const cookies = (socket.handshake.headers.cookie || "")?.split(";");
	let access_token = "";
	for (const cookie of cookies) {
		if (cookie.startsWith("access_token")) {
			access_token = cookie.split("=")[1] ?? "";
		}
	}
	try {
		const { userId } = AuthService.verifyUser(access_token);
		AuthState.storeUserIdSocket(socket, userId);
	} catch (error) {
		socket.disconnect();
		console.log("Disconnected socket for unauthenticated user", socket.id);
	}

	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

export { io };
