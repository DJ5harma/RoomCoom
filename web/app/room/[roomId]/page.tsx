"use client";

import { useRoomData } from "./context/roomData.context";
import { ContainerForm } from "@/app/components/forms/ContainerForm";

export default function Page() {
	const { room, containers, roomMembers } = useRoomData();

	return (
		<div>
			POHOCH GYA
			<p>{room.name}</p>
			<ContainerForm />
			CONTINAERS
			{containers.map((c) => {
				return <div key={c.id}>{JSON.stringify(c)}</div>;
			})}
			MEMBERS
			{roomMembers.map((c) => {
				return <div key={c.id}>{JSON.stringify(c)}</div>;
			})}
		</div>
	);
}
