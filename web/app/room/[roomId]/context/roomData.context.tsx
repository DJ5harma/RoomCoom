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
import { ContainerI, RoomI, uuid } from "../../../types";
import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";

const context = createContext<{
	room: RoomI;
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

	const [loadingRoom, setLoadingRoom] = useState(true);
	const [loadingContainers, setLoadingContainers] = useState(true);

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
	}, []);

	if (loadingRoom || loadingContainers) return <Loading />;
	if (!room) return <NotFound />;
	return (
		<context.Provider value={{ room, containers, setContainers }}>
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
