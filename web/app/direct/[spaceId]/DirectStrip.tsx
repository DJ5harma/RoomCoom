import { useSpace } from "@/entities/space/SpaceProvider";
import Image from "next/image";

export const DirectStrip = () => {
	const {
		space: { id, name, members },
	} = useSpace();

	return (
		<div className="w-full flex items-center bg-blue-900 p-1 gap-5">
			<p>{name}</p>
			<div className="flex gap-1 bg-black rounded-xl p-1">
				{members.map((user) => {
					return (
						<div key={user.id}>
							<Image
								src={user.pictureUrl}
								width={25}
								height={25}
								alt={user.name}
								className="rounded-full"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
