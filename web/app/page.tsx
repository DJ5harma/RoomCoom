"use client";
import Link from "next/link";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center justify-around">
			<Link href={"/user"}>USER MODE</Link>
			<Link href={"/room"}>ROOM MODE</Link>
		</div>
	);
}
