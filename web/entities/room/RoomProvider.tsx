"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, MemberI, RoomI, uuid } from "../../utils/types";
import { Loading } from "@/components/Loading";
import { socket } from "@/utils/SocketConnector";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	room: RoomI;
	instances: InstanceI[];
	members: MemberI[];
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
	const [members, setMembers] = useState<MemberI[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [roomData, instancesData, membersData] = await Promise.all([
				Api.get(`/room/${roomId}`),
				Api.get(`/room/${roomId}/instances`),
				Api.get(`/room/${roomId}/members`),
			]);
			setRoom(roomData.data.room);
			setInstances(instancesData.data.instances);
			setMembers(membersData.data.members);
			setLoading(false);
			
			socket.emit("room:connect", { roomId });
			socket.on("room:add:instance", ({ instance }) => {
				setInstances((p) => [...p, instance]);
			});
			socket.on("room:add:member", ({ member }) => {
				setMembers((p) => [...p, member]);
			});
		})();
		return () => {
			socket.emit("room:disconnect", { roomId });
			socket.off("room:add:instance");
			socket.off("room:add:member");
		};
	}, []);

	if (loading) return <Loading />;
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
