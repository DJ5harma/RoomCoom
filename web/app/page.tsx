"use client";
import { FormEvent, useEffect, useState } from "react";
import { Api } from "@/utils/Api";

export default function Home() {
	const [rooms, setRooms] = useState([]);

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
		<div className="flex min-h-screen items-center justify-center">
			{rooms.map((room) => {
				return <>{JSON.stringify(room)}</>;
			})}
			<form
				onSubmit={handleCreateRoom}
				className="bg-white text-black flex flex-col p-4 gap-4"
			>
				<input type="text" name="roomName" placeholder="Room Name" />
				<button>Create Room</button>
			</form>
		</div>
	);
}
