import { UserBadge } from "@/app/components/user/UserBadge";
import { useContainerData } from "../context/containerData.context";
import { ReactNode } from "react";
import { useRoomData } from "../../../context/roomData.context";

export const Container = ({ children }: { children: ReactNode }) => {
	const { roomMembers } = useRoomData();
	const { container, containerMembers } = useContainerData();
	return (
		<div className="flex">
			<div>
				<p>{container.name}</p>
				<div>
					{containerMembers.map((userId) => {
						const user = roomMembers[userId];
						return (
							<div key={user.id}>
								<UserBadge user={user} />
							</div>
						);
					})}
				</div>
			</div>
			{children}
		</div>
	);
};
