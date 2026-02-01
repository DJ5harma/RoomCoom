"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { ContainerI, UserI, uuid } from "@/app/types";
import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { socket } from "@/app/context/socket.context";

const context = createContext<{
	container: ContainerI;
} | null>(null);

export const ContainerDataProvider = ({
	roomId,
	containerId,
	children,
}: {
	roomId: uuid;
	containerId: uuid;
	children: ReactNode;
}) => {
	const [container, setContainer] = useState<ContainerI | null>(null);
    const [containerMembers, setContainerMembers] = useState<UserI[]>([])
	const [loadingContainer, setLoadingContainer] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/container/${containerId}`)
			.then(({ data: { container } }) => {
				setContainer(container);
			})
			.finally(() => {
				setLoadingContainer(false);
			});
		socket.emit("container:connect", { containerId });
		return () => {
			socket.emit("container:disconnect", { containerId });
		};
	}, []);

	if (loadingContainer) return <Loading />;
	if (!container) return <NotFound />;
	return <context.Provider value={{ container }}>{children}</context.Provider>;
};

export function useContainerData() {
	const x = useContext(context);
	if (!x)
		throw new Error("useRoomData not being used inside a RoomDataProvider");
	return x;
}
