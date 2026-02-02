"use client";

import Link from "next/link";
import { RoomForm } from "@/entities/room/RoomForm";
import { useUser } from "@/entities/user/UserProvider";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalProvider";
import { uuid } from "@/utils/types";

export default function Home() {
	const { roomMap } = useGlobal();
	const { user } = useUser();

	const Diagram = ({ roomId }: { roomId: uuid }) => {
		const { room, instances } = roomMap[roomId];
		return (
			<div className="flex flex-wrap">
				<Link className="border bg-red-800 p-4" href={`/room/${roomId}`}>
					<p>{room.name}</p>
				</Link>
				{instances.map((instance) => {
					return (
						<>
							<div className="border-t-2 border-white w-20" />
							<Link
								className="border bg-blue-800 p-4"
								href={`/room/${roomId}?instanceId=${instance.id}`}
							>
								<p>{instance.name}</p>
							</Link>
						</>
					);
				})}
			</div>
		);
	};
	return (
		<div className="flex min-h-screen w-full items-center gap-6 flex-col p-4">
			<Image src={user.pictureUrl} height={100} width={100} alt="Logo" />
			<h1>Welcome! {user.name}</h1>
			<RoomForm />
			<div className="gap-5 flex flex-col">
				{Object.keys(roomMap).map((roomId) => {
					return <Diagram key={roomId} roomId={roomId} />;
				})}
			</div>
		</div>
	);
}
