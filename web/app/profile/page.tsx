"use client";
import { useUser } from "@/context/user.context";
import Image from "next/image";

export default function Page() {
	const { user } = useUser();
	return (
		<div className="flex flex-col items-center bg-violet-900 w-full justify-center gap-4">
			<h2>Profile Page</h2>
			<Image src={user.pictureUrl} height={40} width={40} alt={user.name} />
			<div>
				<span>Name: </span>
				<span>{user.name}</span>
			</div>
			<div>
				<span>Email: </span>
				<span>{user.email}</span>
			</div>
		</div>
	);
}
