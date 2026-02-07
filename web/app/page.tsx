"use client";
import Link from "next/link";
import { DirectSidebar } from "./DirectSidebar";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center justify-around">
			<div className="h-full">
				<DirectSidebar />
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
