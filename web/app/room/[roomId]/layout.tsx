"use client";

import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { Api } from "@/utils/Api";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { RoomProvider } from "../context/room.context";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId } = useParams() as { roomId: string };
	const [room, setRoom] = useState(null);
	const [groups, setGroups] = useState<
		{
			id: string;
			name: string;
			createdAt: string;
		}[]
	>([]);
	const [members, setMembers] = useState<[]>([]);
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

	return <RoomProvider roomId={roomId}>{children}</RoomProvider>;
}
