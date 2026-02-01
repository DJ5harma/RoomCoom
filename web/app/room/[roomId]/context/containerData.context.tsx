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
	containerMembers: UserI["id"][];
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
	const [containerMembers, setContainerMembers] = useState<UserI["id"][]>([]);
	const [loadingContainer, setLoadingContainer] = useState(true);
	const [loadingContainerMembers, setLoadingContainerMembers] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/container/${containerId}`)
			.then(({ data: { container } }) => {
				setContainer(container);
			})
			.finally(() => {
				setLoadingContainer(false);
			});
		Api.get(`/room/${roomId}/container/${containerId}/members`)
			.then(({ data: { members } }) => {				
				setContainerMembers(members);
			})
			.finally(() => {
				setLoadingContainerMembers(false);
			});
		socket.emit("container:connect", { containerId });
		return () => {
			socket.emit("container:disconnect", { containerId });
		};
	}, []);

	if (loadingContainer || loadingContainerMembers) return <Loading />;
	if (!container) return <NotFound />;
	return (
		<context.Provider value={{ container, containerMembers }}>
			{children}
		</context.Provider>
	);
};

export function useContainerData() {
	const x = useContext(context);
	if (!x)
		throw new Error("useContainerData not being used inside a ContainerDataProvider");
	return x;
}
