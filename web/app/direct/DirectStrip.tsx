import { useSpace } from "@/entities/space/SpaceProvider";
import Image from "next/image";

export const DirectStrip = () => {
	const {
		space: { id, name, members, creator },
	} = useSpace();

	return (
		<div className="w-full flex items-center bg-red-900 p-1 gap-5">
			<div className="flex">
				<p className="font-semibold">ROOM: </p>
				<p>{name}</p>
			</div>
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
			<div className="flex bg-black rounded-xl py-1 px-2 gap-1 items-center">
				<p className="text-sm">Created By:</p>
				<Image
					src={creator.pictureUrl}
					width={25}
					height={25}
					alt={creator.name}
					className="rounded-full"
				/>
			</div>
		</div>
	);
};
