"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Api } from "@/utils/Api";
import { Auth } from "@/components/Auth";
import { Loading } from "@/components/Loading";
import { RoomI, UserI } from "@/utils/types";

const context = createContext<{ user: UserI; rooms: RoomI[] } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserI | null>(null);
	const [rooms, setRooms] = useState<RoomI[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const [userData, roomsData] = await Promise.all([
				Api.get("/user/me"),
				Api.get("/user/rooms"),
			]);
			setUser(userData.data.user);
			setRooms(roomsData.data.rooms);
			setLoading(false);
		})();
	}, []);
	if (loading) return <Loading />;
	if (!user) return <Auth />;
	return (
		<context.Provider value={{ user, rooms }}>{children}</context.Provider>
	);
};

export const useUser = () => {
	const x = useContext(context);
	if (!x) throw new Error("Use context inside the provider only");
	return x;
};
