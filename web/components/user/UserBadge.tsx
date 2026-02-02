import { UserI } from "@/utils/types";
import Image from "next/image";

export const UserBadge = ({ user }: { user: UserI }) => {
	const { email, name, pictureUrl } = user;
	return (
		<div
			title={email}
			className="bg-red-900 flex items-center p-2 gap-2 rounded-lg pr-2 w-40"
		>
			<Image
				className="rounded-full"
				width={25}
				height={25}
				alt={name + "'s image"}
				src={pictureUrl}
			/>
			<p className="text-sm">{name}</p>
		</div>
	);
};
