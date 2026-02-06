"use client";

import { useRoom } from "@/entities/room/RoomProvider";

export default function Page() {
	const {room} = useRoom()
	return (
		<div className="p-2 w-full h-full flex flex-col items-center">
			ROOM page
		</div>
	);
}
