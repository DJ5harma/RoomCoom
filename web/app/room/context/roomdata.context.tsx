import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { uuid } from "@/app/types";
import { ContainerType } from "@/app/types/container.type";
import { RoomType } from "@/app/types/room.type";
import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const context = createContext<{
	room: RoomType;
	containers: ContainerType[];
} | null>(null);

export const RoomDataProvider = ({
	roomId,
	children,
}: {
	roomId: uuid;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<RoomType | null>(null);
	const [containers, setContainers] = useState<ContainerType[]>([]);

	const [loadingRoom, setLoadingRoom] = useState(true);
	const [loadingContainers, setLoadingContainers] = useState(true);
	useEffect(() => {
		Api.get(`/room/${roomId}/join`)
			.then(({ data: { room } }) => {
				setRoom(room);
			})
			.finally(() => setLoadingRoom(false));
		Api.get(`/room/${roomId}/containers`)
			.then(({ data: { containers } }) => {
				setContainers(containers);
			})
			.finally(() => setLoadingContainers(false));
	}, []);

	if (loadingRoom) return <Loading message="Loading room" />;
	if (loadingContainers) return <Loading message="Loading containers" />;
	if (!room) return <NotFound />;

	return (
		<context.Provider value={{ room, containers }}>{children}</context.Provider>
	);
};

export function useRoomData() {
	const x = useContext(context);
	if (!x) throw new Error("useRoom not being used inside a RoomDataProvider");
	return x;
}
