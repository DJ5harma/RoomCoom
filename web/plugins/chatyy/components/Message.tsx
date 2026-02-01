import { UserBadge } from "@/components/user/UserBadge";
import { MessageI } from "../types";
import { useRoomData } from "@/context/roomData.context";
import { UserI } from "@/utils/types";

export const Message = ({ message }: { message: MessageI }) => {
	const { roomMembers } = useRoomData();
	const { content, from } = message;

	const sender = (typeof from === "string" ? roomMembers[from] : from) as UserI;

	return (
		<div>
			<UserBadge user={sender} />
			<p>{content}</p>
		</div>
	);
};
