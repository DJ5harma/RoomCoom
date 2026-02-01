"use client";

import { TestPlugin } from "@/app/plugins/TestPlugin";
import { useRoomData } from "./context/roomData.context";
import { ContainerForm } from "@/app/components/forms/ContainerForm";
import Link from "next/link";
import { UserBadge } from "@/app/components/user/UserBadge";

export default function Page() {
	const { room, containers, roomMembers } = useRoomData();

	return (
		<div>
			<p>{room.name}</p>
			<ContainerForm />
			<div className="w-full flex justify-between">
				<div>
					CONTAINERS
					{containers.map(({ id, name }) => {
						return (
							<Link
								className="flex flex-col bg-green-800 p-4"
								href={`/room/${room.id}/container/${id}`}
								key={id}
							>
								<p>{name}</p>
							</Link>
						);
					})}
				</div>
				<TestPlugin />
				<div>
					MEMBERS
					{Object.values(roomMembers).map((user) => (
						<UserBadge key={user.id} user={user} />
					))}
				</div>
			</div>
		</div>
	);
}
