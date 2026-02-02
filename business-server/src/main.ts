import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AppError } from "./error/AppError";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./auth/auth.initializer";
import { authRouter } from "./auth/auth.routes";
import { ENV_CONSTANTS } from "./constants/env.constants";
import { AuthController } from "./auth/auth.controller";
import mongoose from "mongoose";
import morgan from "morgan";
import { AuthService } from "./auth/auth.service";
import { userRouter } from "./entities/user/user.routes";
import { roomRouter } from "./entities/room/room.routes";
import { AuthState } from "./auth/auth.state";
import { RoomIO } from "./entities/room/room.io";
import { InstanceIO } from "./entities/instance/instance.io";
import Redis from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";
import { UserIO } from "./entities/user/user.io";

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
app.get("/api/server", (_req, res) => {
	console.log("/api/server was hit");
	res.send("hello");
});

app.use(passport.initialize());
app.use("/api/auth", authRouter, AuthController.handleUserProfile);

app.use(AuthController.middlewareAuth);

app.use("/api/user", userRouter);
app.use("/api/room", roomRouter);

app.get("/err", () => {
	throw new Error("ERROR TEST ROUTE - OK");
});

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

		RoomIO(socket);
		InstanceIO(socket);
		UserIO(socket);
	} catch (error) {
		socket.disconnect();
		console.log("Disconnected socket for unauthenticated user", socket.id);
	}

	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

export { io };
