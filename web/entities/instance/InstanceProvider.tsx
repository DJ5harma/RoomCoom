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
import { socket } from "@/context/SocketConnector";

const context = createContext<{
	instance: InstanceI;
	instanceMembers: UserI["id"][];
} | null>(null);

export const InstanceProvider = ({
	instanceId,
	children,
}: {
	instanceId: uuid;
	children: ReactNode;
}) => {
	const [instance, setInstance] = useState<InstanceI | null>(null);
	const [instanceMembers, setInstanceMembers] = useState<UserI["id"][]>([]);
	const [loadingInstance, setLoadingInstance] = useState(true);
	const [loadingInstanceMembers, setLoadingInstanceMembers] = useState(true);

	useEffect(() => {
		Api.get(`/instance/${instanceId}`)
			.then(({ data: { instance } }) => {
				setInstance(instance);
			})
			.finally(() => {
				setLoadingInstance(false);
			});
		Api.get(`/instance/${instanceId}/members`)
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

export function useInstance() {
	const x = useContext(context);
	if (!x)
		throw new Error("useInstance not being used inside a InstanceProvider");
	return x;
}
