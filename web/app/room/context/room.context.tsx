"use client";
import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const context = createContext<{
	room: Room;
	groups: Group[];
	members: Member[];
} | null>(null);

type Room = { id: string; name: string; createdAt: string };
type Group = { id: string; name: string; createdAt: string };
type Member = { id: string; name: string; email: string; profilePic?: string };

export const RoomProvider = ({
	roomId,
	children,
}: {
	roomId: string;
	children: ReactNode;
}) => {
	const [room, setRoom] = useState<Room | null>(null);
	const [groups, setGroups] = useState<Group[]>([]);
	const [members, setMembers] = useState<Member[]>([]);
	const [loadingRoom, setLoadingRoom] = useState(true);

	useEffect(() => {
		Api.get(`/manager/get-room/${roomId}`)
			.then(({ data: { room, groups, members } }) => {
				console.log({ room, groups, members });

				setRoom(room);
				setGroups(groups);
				setMembers(members);
			})
			.finally(() => {
				setLoadingRoom(false);
			});
	}, []);

	if (loadingRoom) return <Loading />;

	if (!room) return <NotFound />;

	return (
		<context.Provider value={{ room, groups, members }}>
			{children}
		</context.Provider>
	);
};

export const useRoom = () => {
	const ctx = useContext(context);
	if (!ctx) throw new Error("USE useROom inside ROomPRovider");
	return ctx;
};
