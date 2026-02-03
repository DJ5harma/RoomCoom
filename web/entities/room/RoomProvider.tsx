"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, RoomI, UserI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { socket } from "@/utils/SocketConnector";
import { NotFound } from "@/components/NotFound";

type MemberType = { user: UserI };
type MemberMapType = {
	[userId: uuid]: MemberType;
};
const context = createContext<{
	room: RoomI;
	instances: InstanceI[];
	addInstance: (instance: InstanceI) => void;
	getMemberByUserId: (userId: uuid) => MemberType;
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
	const [memberMap, setMemberMap] = useState<MemberMapType>({});

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

			const memberMap: MemberMapType = {};
			membersData.data.member((member: MemberType) => {
				memberMap[member.user.id] = member;
			});
			setMemberMap(memberMap);
			setLoading(false);

			socket.emit("room:connect", { roomId });
			socket.on("room:add:instance", ({ instance }) => {
				setInstances((p) => [...p, instance]);
			});
			socket.on("room:add:member", ({ member }: { member: MemberType }) => {
				setMemberMap((p) => ({ ...p, [member.user.id]: member }));
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
	function getMemberByUserId(userId: uuid) {
		return memberMap[userId];
	}
	return (
		<context.Provider value={{ room, instances, addInstance, getMemberByUserId }}>
			{children}
		</context.Provider>
	);
};

export function useRoom() {
	const x = useContext(context);
	if (!x) throw new Error("useRoom not being used inside a RoomProvider");
	return x;
}
