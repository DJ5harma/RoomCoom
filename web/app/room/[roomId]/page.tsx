"use client";

import { useRoomData } from "@/context/roomData.context";
import { InstanceForm } from "@/instance/InstanceForm";
import Link from "next/link";
import { UserBadge } from "@/components/user/UserBadge";
import { useSearchParams } from "next/navigation";
import { InstanceProvider } from "../../../instance/InstanceProvider";
import { Instance } from "../../../instance/Instance";

export default function Page() {
	const { room, instances, roomMembers } = useRoomData();
	const searchParams = useSearchParams();

	const instanceId = searchParams.get("instanceId");

	if (instanceId) {
		return (
			<div className="w-full">
				<InstanceProvider instanceId={instanceId}>
					<Instance />
				</InstanceProvider>
			</div>
		);
	}

	return (
		<div className="p-2 w-full flex flex-col items-center">
			<p>{room.name}</p>
			<InstanceForm />
			<div className="w-full flex justify-between">
				<div>
					INSTANCES
					{instances.map(({ id, name }) => {
						return (
							<Link
								className="flex flex-col bg-green-800 p-4"
								href={`/room/${room.id}?instanceId=${id}`}
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
