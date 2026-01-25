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
import { containerRouter } from "./entities/container/container.routes";
import { AuthState } from "./auth/auth.state";
import { RoomIO } from "./entities/room/room.io";

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

const io = new Server(server);

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
	} catch (error) {
		socket.disconnect();
		console.log("Disconnected socket for unauthenticated user", socket.id);
	}

	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

export { io };
