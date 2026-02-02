"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, RoomI, UserI, uuid } from "../../utils/types";
import { Loading } from "@/components/Loading";
import { socket } from "@/context/SocketConnector";
import { useGlobal } from "../../context/GlobalProvider";

const context = createContext<{
	room: RoomI;
	instances: InstanceI[];
	roomMembers: { [userId: uuid]: UserI };
} | null>(null);

export const RoomProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [roomMembers, setRoomMembers] = useState<{ [userId: uuid]: UserI }>({});
	const { roomMap } = useGlobal();
	const { room, instances } = roomMap[roomId];

	const [loadingRoomMembers, setLoadingRoomMembers] = useState(true);

	useEffect(() => {
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

	if (loadingRoomMembers) return <Loading />;
	return (
		<context.Provider value={{ roomMembers, room, instances }}>
			{children}
		</context.Provider>
	);
};

export function useRoomData() {
	const x = useContext(context);
	if (!x)
		throw new Error("useRoomData not being used inside a RoomProvider");
	return x;
}
