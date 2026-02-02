import { MessageI } from "../types";
import { useRoomData } from "@/context/roomData.context";
import { useUser } from "@/context/user.context";
import { UserI } from "@/utils/types";
import Image from "next/image";

export const Message = ({ message }: { message: MessageI }) => {
	const { roomMembers } = useRoomData();
	const { content, from } = message;
	const { user } = useUser();

	const sender = (typeof from === "string" ? roomMembers[from] : from) as UserI;
	const didISend = user.id === sender.id;
	return (
		<div
			className={"flex gap-2 " + (didISend ? "flex-row-reverse" : "flex-row")}
		>
			{true && (
				<Image
					className="rounded-full size-7"
					src={sender.pictureUrl}
					height={25}
					width={25}
					alt={sender.name}
				/>
			)}
			{didISend ? (
				<div className="bg-blue-900 text-white flex flex-col gap-2 text-sm p-3 rounded-xl shadow shadow-cyan-200">
					<p className="text-cyan-300">{sender.name}</p>
					<p>{content}</p>
				</div>
			) : (
				<div className="bg-neutral-800 text-white flex flex-col gap-2 text-sm p-3 rounded-xl shadow shadow-red-200">
					<p className="text-red-400">{sender.name}</p>
					<p>{content}</p>
				</div>
			)}
		</div>
	);
};
