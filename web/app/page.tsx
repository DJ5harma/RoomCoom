"use client";
import { DirectsBar } from "./DirectsBar";
import { RoomsBar } from "./RoomsBar";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center">
			<div className="h-full">
				<DirectsBar />
			</div>
			<div className="h-full">
				<RoomsBar />
			</div>
		</div>
	);
}
