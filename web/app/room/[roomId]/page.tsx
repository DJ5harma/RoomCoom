"use client";

import { useRoomData } from "../context/roomdata.context";

export default function Page() {
	const { room, containers } = useRoomData();
	return (
		<div>
			<p>{room.name}</p>
			{containers.map(({ id, name, type }) => {
				return (
					<div key={id}>
            <p>Container</p>
						<p>{name}</p>
						<p>{type}</p>
					</div>
				);
			})}
		</div>
	);
}
