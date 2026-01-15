import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AppError } from "./error/AppError";
import cors from "cors";

// AUTH IMPORTS
import passport from "passport";
import "./auth/auth-initializer";
import { authRouter } from "./auth/auth.routes";
import { ENV_CONSTANTS } from "./constants/env.constants";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
	res.send("hello");
});

app.use(passport.initialize());
app.use("/api/auth", authRouter);
app.get("/err", (req, res) => {
	throw new Error("ERROR TEST ROUTE - OK");
});

app.use(AppError.ExpressErrorHandler);

const PORT = process.env.PORT!;

server.listen(PORT, () => {
	console.log(`listening on ${ENV_CONSTANTS.MY_URL}`);
});

io.on("connection", (socket) => {
	console.log("a user connected");
});
