import { MessageI } from "../types";
import { useRoomData } from "@/context/roomData.context";
import { UserI } from "@/utils/types";
import Image from "next/image";

export const Message = ({ message }: { message: MessageI }) => {
	const { roomMembers } = useRoomData();
	const { content, from } = message;

	const sender = (typeof from === "string" ? roomMembers[from] : from) as UserI;

	return (
		<div className="">
			<div className="bg-blue-300 text-black flex gap-2 text-sm items-center p-1">
				<Image
					className="rounded-full"
					src={sender.pictureUrl}
					height={25}
					width={25}
					alt={sender.name}
				/>
				<p>{sender.name}</p>
			</div>
			<div className="bg-blue-900 p-4">
				<p>{content}</p>
			</div>
		</div>
	);
};
