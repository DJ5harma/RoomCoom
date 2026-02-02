"use client";

import Link from "next/link";
import { RoomForm } from "@/components/forms/RoomForm";
import { useUser } from "@/context/user.context";
import Image from "next/image";
import { useGlobal } from "@/context/global.context";

export default function Home() {
	const { roomMap } = useGlobal();
	const { user } = useUser();
	return (
		<div className="flex min-h-screen w-full items-center gap-6 flex-col p-4">
			<RoomForm />
			<Image src={user.pictureUrl} height={100} width={100} alt="Logo" />
			<div className="gap-5 flex flex-col">
				{Object.values(roomMap).map(({ room }) => {
					const { id } = room;
					return (
						<Link
							className="border border-white p-4"
							href={`/room/${id}`}
							key={id}
						>
							{JSON.stringify(room)}
						</Link>
					);
				})}
			</div>
		</div>
	);
}
