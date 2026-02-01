"use client";

import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { RoomI, uuid } from "@/app/types";
import { Api } from "@/utils/Api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { roomId } = useParams() as { roomId: uuid };
	const [room, setRoom] = useState<RoomI | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}`)
			.then(({ data: { room } }) => {
				setRoom(room);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) return <Loading />;
	if (!room) return <NotFound />;
	return (
		<div>
			POHOCH GYA
			<p>{room.name}</p>
		</div>
	);
}
