"use client";
import { useRoom } from "../context/room.context";

export default function Page() {
	const obj = useRoom();
	console.log({obj});
	
	return (
		<div>
			{JSON.stringify(obj)}
		</div>
	);
}
