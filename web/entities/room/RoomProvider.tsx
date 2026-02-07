"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { RoomI, SpaceI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	room: RoomI;
	clubs: SpaceI[];
} | null>(null);

export const RoomProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<RoomI | null>(null);
	const [clubs, setClubs] = useState<SpaceI[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [roomData] = await Promise.all([Api.get(`/room/${roomId}`)]);
			setRoom(roomData.data.room);
			setClubs(roomData.data.clubs);

			setLoading(false);
		})();
	}, [roomId]);

	if (loading) return <Loading />;
	if (!room) return <NotFound />;
	return (
		<context.Provider value={{ room, clubs }}>{children}</context.Provider>
	);
};

export function useRoom() {
	const x = useContext(context);
	if (!x) throw new Error("useRoom not being used inside a RoomProvider");
	return x;
}
