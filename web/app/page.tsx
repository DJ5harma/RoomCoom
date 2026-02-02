"use client";

import Link from "next/link";
import { RoomForm } from "@/entities/room/RoomForm";
import Image from "next/image";
import { RoomI } from "@/utils/types";
import { useEffect, useState } from "react";
import { Api } from "@/utils/Api";
import { useUser } from "@/entities/user/UserProvider";

export default function Home() {
	const [rooms, setRooms] = useState<RoomI[]>([]);
	const { user } = useUser();
	useEffect(() => {
		Api.get("user/rooms").then(({ data: { rooms } }) => {
			setRooms(rooms);
		});
	}, []);

	return (
		<div className="flex min-h-screen w-full items-center gap-6 flex-col p-4">
			<Image src={user.pictureUrl} height={100} width={100} alt="Logo" />
			<h1>Welcome! {user.name}</h1>
			<RoomForm />
			<div className="gap-5 flex flex-col">
				{rooms.map((room) => {
					return (
						<Link
							key={room.id}
							className="border bg-red-800 p-4"
							href={`/room/${room.id}`}
						>
							<p>{room.name}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
