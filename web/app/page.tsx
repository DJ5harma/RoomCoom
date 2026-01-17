"use client";
import { FormEvent, useState } from "react";
import { Api } from "@/utils/Api";

export default function Home() {
	const [rooms, setRooms] = useState([]);

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
			<form onSubmit={handleCreateRoom}>
				<input type="text" name="roomName" />
				<button>Create Room</button>
			</form>
		</div>
	);
}
