"use client";
import { FormEvent, useEffect, useState } from "react";
import { Api } from "@/utils/Api";
import Link from "next/link";

export default function Home() {
	const [rooms, setRooms] = useState<
		{ id: string; name: string; createdAt: string }[]
	>([]);

	useEffect(() => {
		Api.get("/manager/my-rooms").then(({ data }) => {
			setRooms(data.rooms);
		});
	}, []);
	function handleCreateRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const roomName = formData.get("roomName");

		Api.post("/manager/create-room", { roomName }).then(
			({ data }: { data: { room: (typeof rooms)[0] } }) => {
				setRooms([...rooms, data.room]);
			},
		);
	}

	return (
		<div className="flex min-h-screen items-center gap-6 flex-col p-4">
			<form
				onSubmit={handleCreateRoom}
				className="bg-white text-black flex flex-col p-4 gap-4"
			>
				<input type="text" name="roomName" placeholder="Room Name" />
				<button>Create Room</button>
			</form>
			{rooms.map(({ id, name, createdAt }) => {
				return (
					<Link href={`/room/${id}`} className="flex flex-col gap-2 border p-4" key={id}>
						<p className="text-xl">Room: {name}</p>
						<p>created On: {createdAt}</p>
					</Link>
				);
			})}
		</div>
	);
}
