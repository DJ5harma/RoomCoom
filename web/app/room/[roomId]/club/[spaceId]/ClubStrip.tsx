import { useRoom } from "@/entities/room/RoomProvider";
import { useSpace } from "@/entities/space/SpaceProvider";
import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export const ClubStrip = () => {
	const { getUserById, room } = useRoom();
	const {
		space: { id, name, creator, members },
	} = useSpace();

	return (
		<div className="w-full flex items-center bg-green-900 p-1 gap-5 justify-between">
			<div className="flex items-center gap-2">
				<Link href={`/room/${room.id}`} className="flex bg-red-900 p-2 items-center">
					<BiArrowBack />
					<p>Back to Room</p>
				</Link>
				<div className="flex">
					<p className="font-semibold">CLUB: </p>
					<p>{name}</p>
				</div>
				<div className="flex gap-1 bg-black rounded-xl p-1">
					{members.map((memberId) => {
						const user = getUserById(memberId);
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
