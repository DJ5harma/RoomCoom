import { UserBadge } from "@/app/components/user/UserBadge";
import { useContainerData } from "../../context/containerData.context";
import { useRoomData } from "../../context/roomData.context";
import { Chatyy } from "@/app/plugins/chatyy/Chatyy";
import { useSearchParams } from "next/navigation";

export const Container = () => {
	const { roomMembers } = useRoomData();
	const searchParams = useSearchParams();
	const { container, containerMembers } = useContainerData();
	const plugin = searchParams.get("plugin") as string;
	console.log({ plugin });

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
			{{
				chatyy: <Chatyy />,
			}[plugin] ?? <Chatyy />}
		</div>
	);
};
