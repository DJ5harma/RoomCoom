"use client";

import Link from "next/link";
import { useRooms } from "./context/rooms.context";

export default function Home() {
	const { rooms } = useRooms();
	return (
		<div className="flex min-h-screen items-center gap-6 flex-col p-4">
			Home
			<div>
				{rooms.map(({ id, name, createdAt }) => {
					return (
						<Link href={`/room/${id}`} key={id}>
							<p>Room: {name}</p>
							<p>Created: {createdAt}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
