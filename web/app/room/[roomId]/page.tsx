"use client";

import { useRoomData } from "@/context/roomData.context";
import { ContainerForm } from "@/components/forms/ContainerForm";
import Link from "next/link";
import { UserBadge } from "@/components/user/UserBadge";
import { useSearchParams } from "next/navigation";
import { ContainerDataProvider } from "../../../container/containerData.context";
import { Container } from "../../../container/Container";

export default function Page() {
	const { room, containers, roomMembers } = useRoomData();
	const searchParams = useSearchParams();

	const containerId = searchParams.get("containerId");

	if (containerId) {
		return (
			<div className="w-full">
				<ContainerDataProvider containerId={containerId}>
						<Container />
				</ContainerDataProvider>
			</div>
		);
	}

	return (
		<div className="p-2 w-full flex flex-col items-center">
			<p>{room.name}</p>
			<ContainerForm />
			<div className="w-full flex justify-between">
				<div>
					CONTAINERS
					{containers.map(({ id, name }) => {
						return (
							<Link
								className="flex flex-col bg-green-800 p-4"
								href={`/room/${room.id}?containerId=${id}`}
								key={id}
							>
								<p>{name}</p>
							</Link>
						);
					})}
				</div>
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
