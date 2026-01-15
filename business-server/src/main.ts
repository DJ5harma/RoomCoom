import express from "express";
import http from "http";
import { Server } from "socket.io";
import { AppError } from "./error/AppError";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
	res.send("hello");
});
app.get("/err", (req, res) => {
	throw new Error("ERROR TEST ROUTE - OK");
});

app.use(AppError.ExpressErrorHandler);

const PORT = 4000;
server.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});

io.on("connection", (socket) => {
	console.log("a user connected");
});
