"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { InstanceI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/utils/SocketConnector";

const context = createContext<{
	instance: InstanceI;
} | null>(null);

export const InstanceProvider = ({
	instanceId,
	children,
}: {
	instanceId: uuid;
	children: ReactNode;
}) => {
	const [instance, setInstance] = useState<InstanceI | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [instanceData] = await Promise.all([
				Api.get(`/instance/${instanceId}`),
			]);
			setInstance(instanceData.data.instance);
			setLoading(false);

			socket.on("instance:add:member", ({ userId }: { userId: uuid }) => {
				setInstance((p) => ({
					...p!,
					members: [...instance!.members, userId],
				}));
			});
			socket.emit("instance:connect", { instanceId });
			return () => {
				socket.emit("instance:disconnect", { instanceId });
			};
		})();
	}, []);

	if (loading) return <Loading />;
	if (!instance) return <NotFound />;
	return <context.Provider value={{ instance }}>{children}</context.Provider>;
};

export function useInstance() {
	const x = useContext(context);
	if (!x)
		throw new Error("useInstance not being used inside a InstanceProvider");
	return x;
}
