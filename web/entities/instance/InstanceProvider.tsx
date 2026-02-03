"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, MemberI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/utils/SocketConnector";

const context = createContext<{
	instance: InstanceI;
	members: MemberI[];
} | null>(null);

export const InstanceProvider = ({
	instanceId,
	children,
}: {
	instanceId: uuid;
	children: ReactNode;
}) => {
	const [instance, setInstance] = useState<InstanceI | null>(null);
	const [members, setMembers] = useState<MemberI[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [instanceData, membersData] = await Promise.all([
				Api.get(`/instance/${instanceId}`),
				Api.get(`/instance/${instanceId}/members`),
			]);
			setInstance(instanceData.data.instance);
			setMembers(membersData.data.members);
			setLoading(false);

			socket.on("instance:add:member", ({ member }) => {
				setMembers((p) => [...p, member]);
			});
			socket.emit("instance:connect", { instanceId });
			return () => {
				socket.emit("instance:disconnect", { instanceId });
			};
		})();
	}, []);

	if (loading) return <Loading />;
	if (!instance) return <NotFound />;
	return (
		<context.Provider value={{ instance, members }}>
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
