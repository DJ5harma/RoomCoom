"use client";

import { useRoom } from "@/entities/room/RoomProvider";
import { useSearchParams } from "next/navigation";
import { InstanceProvider } from "../../../entities/instance/InstanceProvider";
import { Instance } from "../../../entities/instance/Instance";

export default function Page() {
	const searchParams = useSearchParams();
	const instanceId = searchParams.get("instanceId");

	const { room } = useRoom();

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
		</div>
	);
}
