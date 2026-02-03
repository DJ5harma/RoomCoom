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
import { UserI } from "@/utils/types";
import { OmittedMembersRoomType } from "@/utils/customTypes";

const context = createContext<{
	user: UserI;
	rooms: OmittedMembersRoomType[];
	addRoom: (room: OmittedMembersRoomType) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserI | null>(null);
	const [rooms, setRooms] = useState<OmittedMembersRoomType[]>([]);
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

	function addRoom(room: OmittedMembersRoomType) {
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
