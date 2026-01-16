"use client";

import { API_URL } from "@/utils/Api";
import { ReactNode, useEffect } from "react";
import { io } from "socket.io-client";

export const socket = io(API_URL, {
	withCredentials: true,
	autoConnect: false,
	transports: ["websocket", "polling"],
});
export const SocketConnector = ({ children }: { children: ReactNode }) => {
	useEffect(() => {
		if (socket.connected) return;

		socket.connect();
		return () => {
			socket.disconnect();
		};
	}, []);
	return <>{children}</>;
};
