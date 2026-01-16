import { API_URL } from "@/utils/Api";
import { io } from "socket.io-client";

const socket = io(API_URL, {
	withCredentials: true,
	transports: ["websocket", "polling"],
	autoConnect: true
});

export { socket };
