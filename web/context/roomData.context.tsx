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
import { ContainerI, RoomI, UserI, uuid } from "../utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/context/socket.context";

const context = createContext<{
	room: RoomI;
	roomMembers: { [userId: uuid]: UserI };
	containers: ContainerI[];
	setContainers: Dispatch<SetStateAction<ContainerI[]>>;
} | null>(null);

export const RoomDataProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<RoomI | null>(null);
	const [containers, setContainers] = useState<ContainerI[]>([]);
	const [roomMembers, setRoomMembers] = useState<{ [userId: uuid]: UserI }>({});

	const [loadingRoom, setLoadingRoom] = useState(true);
	const [loadingContainers, setLoadingContainers] = useState(true);
	const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}`)
			.then(({ data: { room } }) => {
				setRoom(room);
			})
			.finally(() => {
				setLoadingRoom(false);
			});
		Api.get(`/room/${roomId}/containers`)
			.then(({ data: { containers } }) => {
				setContainers(containers);
			})
			.finally(() => {
				setLoadingContainers(false);
			});
		Api.get(`/room/${roomId}/members`)
			.then(({ data: { members } }) => {
				setRoomMembers(members);
			})
			.finally(() => {
				setLoadingRoomMembers(false);
			});
		socket.emit("room:connect", { roomId });
		return () => {
			socket.emit("room:disconnect", { roomId });
		};
	}, []);

	if (loadingRoom || loadingContainers || loadingRoomMembers)
		return <Loading />;
	if (!room) return <NotFound />;
	return (
		<context.Provider value={{ room, containers, roomMembers, setContainers }}>
			{children}
		</context.Provider>
	);
};

export function useRoomData() {
	const x = useContext(context);
	if (!x)
		throw new Error("useRoomData not being used inside a RoomDataProvider");
	return x;
}
