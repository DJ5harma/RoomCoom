"use client";

import Link from "next/link";
import { useRooms } from "./context/rooms.context";
import { RoomForm } from "./components/forms/RoomForm";

export default function Home() {
	const { rooms } = useRooms();
	return (
		<div className="flex min-h-screen items-center gap-6 flex-col p-4">
			<RoomForm />
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
