"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, UserI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/context/socket.context";
import { useRoomData } from "../context/roomData.context";

const context = createContext<{
	instance: InstanceI;
	instanceMembers: UserI["id"][];
} | null>(null);

export const InstanceDataProvider = ({
	instanceId,
	children,
}: {
	instanceId: uuid;
	children: ReactNode;
}) => {
	const {
		room: { id: roomId },
	} = useRoomData();
	const [instance, setInstance] = useState<InstanceI | null>(null);
	const [instanceMembers, setInstanceMembers] = useState<UserI["id"][]>([]);
	const [loadingInstance, setLoadingInstance] = useState(true);
	const [loadingInstanceMembers, setLoadingInstanceMembers] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/instance/${instanceId}`)
			.then(({ data: { instance } }) => {
				setInstance(instance);
			})
			.finally(() => {
				setLoadingInstance(false);
			});
		Api.get(`/room/${roomId}/instance/${instanceId}/members`)
			.then(({ data: { members } }) => {
				setInstanceMembers(members);
			})
			.finally(() => {
				setLoadingInstanceMembers(false);
			});
		socket.emit("instance:connect", { instanceId });
		return () => {
			socket.emit("instance:disconnect", { instanceId });
		};
	}, []);

	if (loadingInstance || loadingInstanceMembers) return <Loading />;
	if (!instance) return <NotFound />;
	return (
		<context.Provider value={{ instance, instanceMembers }}>
			{children}
		</context.Provider>
	);
};

export function useInstanceData() {
	const x = useContext(context);
	if (!x)
		throw new Error(
			"useInstanceData not being used inside a InstanceDataProvider",
		);
	return x;
}
