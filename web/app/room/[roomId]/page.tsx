"use client";

import { Loading } from "@/app/components/Loading";
import { NotFound } from "@/app/components/NotFound";
import { Api } from "@/utils/Api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { roomId } = useParams();
	const [room, setRoom] = useState(null);
	const [loadingRoom, setLoadingRoom] = useState(true);

	useEffect(() => {
		Api.get(`/manager/get-room/${roomId}`)
			.then(({ data }) => {
				setRoom(data.room);
			})
			.finally(() => {
				setLoadingRoom(false);
			});
	}, []);
	if (loadingRoom) return <Loading />;
	if (!room) return <NotFound />;
	return <div>{roomId}</div>;
}
