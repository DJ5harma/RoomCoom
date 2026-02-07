"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { RoomI, UserI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	room: RoomI;
	getUserById: (userId: uuid) => UserI;
} | null>(null);

export const RoomProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<RoomI | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [roomData] = await Promise.all([Api.get(`/room/${roomId}`)]);
			setRoom(roomData.data.room);
			setLoading(false);
		})();
	}, [roomId]);

	if (loading) return <Loading />;
	if (!room) return <NotFound />;

	function getUserById(userId: uuid) {
		for (const member of room!.members) {
			if (userId === member.user.id) return member.user;
		}
		return {} as UserI;
	}

	return (
		<context.Provider value={{ room, getUserById }}>
			{children}
		</context.Provider>
	);
};

export function useRoom() {
	const x = useContext(context);
	if (!x) throw new Error("useRoom not being used inside a RoomProvider");
	return x;
}
