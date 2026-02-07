"use client";
import Link from "next/link";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center justify-around">
			<Link href={"/user"} className="bg-white text-black w-full h-full flex justify-center items-center">USER MODE</Link>
			<Link href={"/room"} className="bg-black text-white w-full h-full flex justify-center items-center">ROOM MODE</Link>
		</div>
	);
}
