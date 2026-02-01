"use client";

import Link from "next/link";
import { useRooms } from "./context/rooms.context";
import { RoomForm } from "./components/forms/RoomForm";
import { useUser } from "./context/user.context";
import Image from "next/image";

export default function Home() {
	const { rooms } = useRooms();
	const {user} = useUser()
	return (
		<div className="flex min-h-screen items-center gap-6 flex-col p-4">
			<RoomForm />
			<Image src={user.pictureUrl} height={100} width={100} alt="Logo" />
			<div className="gap-5 flex flex-col">
				{rooms.map((room) => {
					const {id} = room; 
					return (
						<Link className="border border-white p-4" href={`/room/${id}`} key={id}>
							{JSON.stringify(room)}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
