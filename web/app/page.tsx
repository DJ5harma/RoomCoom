"use client";
import { useUser, useUserDirectSpaces } from "@/entities/user/UserProvider";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
	const { directSpaces } = useUserDirectSpaces();
	const { user } = useUser();
	return (
		<div className="w-full h-screen flex items-center justify-around">
			<div className="h-full p-2 flex flex-col gap-2">
				{/* <Link
					href={"/user"}
					className="bg-white text-black w-full h-full flex justify-center items-center"
				>
					USER MODE
				</Link> */}
				<p>Your Direct Connections:</p>
				{directSpaces.map(({ id, name, members }) => {
					const peer = members.filter(({ id }) => id !== user.id)[0];
					return (
						<Link
							key={id}
							className="flex items-center gap-2 p-2 border rounded-2xl"
							href={`/direct/${id}`}
						>
							<Image
								src={peer.pictureUrl}
								alt={name}
								height={50}
								width={50}
								className="rounded-full"
							/>
							<p className="text-sm">{peer.name}</p>
						</Link>
					);
				})}
			</div>
			<div className="flex-1">
				<Link
					href={"/room"}
					className="bg-black text-white w-full h-full flex justify-center items-center"
				>
					ROOM MODE
				</Link>
			</div>
		</div>
	);
}
