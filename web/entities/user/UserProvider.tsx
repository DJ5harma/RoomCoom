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
import { RoomI, SpaceI, UserI } from "@/utils/types";

const context = createContext<{
	user: UserI;
	rooms: RoomI[];
	addRoom: (room: RoomI) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserI | null>(null);
	const [rooms, setRooms] = useState<RoomI[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Api.get("/user/me")
			.then(async (userData) => {
				setUser(userData.data.user);

				const [roomsData] = await Promise.all([Api.get("/user/rooms")]);
				setRooms(roomsData.data.rooms);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	if (loading) return <Loading />;
	if (!user) return <Auth />;

	function addRoom(room: RoomI) {
		setRooms((p) => [...p, room]);
	}

	return (
		<context.Provider value={{ user, rooms, addRoom }}>
			{children}
		</context.Provider>
	);
};

export const useUser = () => {
	const x = useContext(context);
	if (!x) throw new Error("Use context inside the provider only");
	return x;
};

export const useUserDirectSpaces = () => {
	const [directSpaces, setDirectSpaces] = useState<SpaceI[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Api.get("/user/direct/spaces")
			.then(({ data: { spaces } }) => {
				setDirectSpaces(spaces);
				console.log({spaces});
				
			})
			.finally(() => setLoading(false));
	}, []);
	return { directSpaces, loading };
};
