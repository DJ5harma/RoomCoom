"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { RoomI } from "../types";

const context = createContext<{
	rooms: RoomI[];
	setRooms: Dispatch<SetStateAction<RoomI[]>>;
} | null>(null);

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
	const [rooms, setRooms] = useState<RoomI[]>([]);
	useEffect(() => {
		Api.get("/user/rooms").then(({ data: { rooms } }) => setRooms(rooms));
	}, []);
	return (
		<context.Provider value={{ rooms, setRooms }}>{children}</context.Provider>
	);
};

export function useRooms() {
	const x = useContext(context);
	if (!x) throw new Error("useRooms not being used inside a RoomsProvider");
	return x;
}
