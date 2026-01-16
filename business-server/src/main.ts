import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AppError } from "./error/AppError";
import cors from "cors";
import cookieParser from "cookie-parser";
// AUTH IMPORTS
import passport from "passport";
import "./auth/auth.initializer";
import { authRouter } from "./auth/auth.routes";
import { ENV_CONSTANTS } from "./constants/env.constants";
import { AuthController } from "./auth/auth.controller";
import { userRouter } from "./entities/user/user.routes";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));
app.get("/api/server", (req, res) => {
	console.log("/api/server was hit");

	res.send("hello");
});

app.use(passport.initialize());
app.use("/api/auth", authRouter, AuthController.handleUserProfile);

app.use(AuthController.middlewareAuth);
app.use("/api/user", userRouter);

app.get("/err", () => {
	throw new Error("ERROR TEST ROUTE - OK");
});

app.use(AppError.ExpressErrorHandler);

const PORT = process.env.PORT!;

mongoose.connect(ENV_CONSTANTS.MONGO_URI).then(() => {
	console.log("MongoDB connected");
	server.listen(PORT, () => {
		console.log(`express and socket.io server: ${ENV_CONSTANTS.MY_URL}`);
	});
});

io.on("connection", (socket) => {
	console.log("Connected", socket.id);

	const cookies = socket.handshake.headers.cookie;
	console.log("socket-cookies:", cookies);

	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

export { io };
