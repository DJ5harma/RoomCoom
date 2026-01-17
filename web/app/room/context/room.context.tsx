"use client";
import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { Api } from "@/utils/Api";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { RoomLeftbar } from "../components/leftbar/RoomLeftbar";
import { useParams } from "next/navigation";

const context = createContext<{
	room: Room;
	groups: Group[];
	members: Member[];
	distinctUsers: Member["user"][];

	setGroups: Dispatch<SetStateAction<Group[]>>;
	setMembers: Dispatch<SetStateAction<Member[]>>;
} | null>(null);

export type Room = { id: string; name: string; createdAt: string };
export type Group = { id: string; name: string; createdAt: string };
export type Member = {
	groupId: string;
	user: { id: string; name: string; email: string; profilePic?: string };
};

export const RoomProvider = ({ children }: { children: ReactNode }) => {
	const { roomId } = useParams() as { roomId: string };
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

	const distinctUsers = (() => {
		const notedUserIds = new Set();
		const resArray: Member["user"][] = [];
		members.forEach(({ user }) => {
			if (notedUserIds.has(user.id)) return;
			notedUserIds.add(user.id);
			resArray.push(user);
		});
		return resArray;
	})();

	if (loadingRoom) return <Loading />;

	if (!room) return <NotFound />;

	return (
		<context.Provider
			value={{ room, groups, members, distinctUsers, setGroups, setMembers }}
		>
			<div className="flex border border-red-400 min-h-screen">
				<RoomLeftbar />
				{children}
			</div>
		</context.Provider>
	);
};

export const useRoom = () => {
	const ctx = useContext(context);
	if (!ctx) throw new Error("USE useROom inside ROomPRovider");
	return ctx;
};
