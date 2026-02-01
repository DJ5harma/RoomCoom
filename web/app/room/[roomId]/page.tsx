"use client";

import { TestPlugin } from "@/app/plugins/TestPlugin";
import { useRoomData } from "./context/roomData.context";
import { ContainerForm } from "@/app/components/forms/ContainerForm";
import Link from "next/link";

export default function Page() {
	const { room, containers, roomMembers } = useRoomData();

	return (
		<div>
			POHOCH GYA
			<p>{room.name}</p>
			<ContainerForm />
			CONTINAERS
			{containers.map((c) => {
				return (
					<Link href={`/room/${room.id}/container/${c.id}`} key={c.id}>
						{JSON.stringify(c)}
					</Link>
				);
			})}
			MEMBERS
			{roomMembers.map((c) => {
				return <div key={c.id}>{JSON.stringify(c)}</div>;
			})}
			<TestPlugin />
		</div>
	);
}
