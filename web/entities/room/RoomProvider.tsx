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
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	room: RoomI;
	instances: InstanceI[];
	members: { [userId: uuid]: UserI };
	addInstance: (instance: InstanceI) => void;
} | null>(null);

export const RoomProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<RoomI | null>(null);
	const [instances, setInstances] = useState<InstanceI[]>([]);
	const [members, setMembers] = useState<{ [userId: uuid]: UserI }>({});

	const [loadingRoom, setLoadingRoom] = useState(true);
	const [loadingInstances, setLoadingInstances] = useState(true);
	const [loadingmembers, setLoadingmembers] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}`)
			.then(({ data: { room } }) => {
				setRoom(room);
			})
			.finally(() => {
				setLoadingRoom(false);
			});
		Api.get(`/room/${roomId}/instances`)
			.then(({ data: { instances } }) => {
				setInstances(instances);
			})
			.finally(() => {
				setLoadingInstances(false);
			});
		Api.get(`/room/${roomId}/members`)
			.then(({ data: { members } }) => {
				setMembers(members);
			})
			.finally(() => {
				setLoadingmembers(false);
			});
		socket.emit("room:connect", { roomId });
		return () => {
			socket.emit("room:disconnect", { roomId });
		};
	}, []);

	if (loadingRoom || loadingInstances || loadingmembers) return <Loading />;
	if (!room) return <NotFound />;

	function addInstance(instance: InstanceI) {
		setInstances((p) => [instance, ...p]);
	}
	return (
		<context.Provider value={{ members, room, instances, addInstance }}>
			{children}
		</context.Provider>
	);
};

export function useRoom() {
	const x = useContext(context);
	if (!x) throw new Error("useRoom not being used inside a RoomProvider");
	return x;
}
