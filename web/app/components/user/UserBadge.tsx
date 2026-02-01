import { UserI } from "@/app/types";
import Image from "next/image";

export const UserBadge = ({ user }: { user: UserI }) => {
	const { email, name, pictureUrl } = user;
	return (
		<div
			title={email}
			className="bg-blue-900 flex items-center p-2 gap-2 rounded-lg pr-4"
		>
			<Image
				className="rounded-full"
				width={40}
				height={40}
				alt={name + "'s image"}
				src={pictureUrl}
			/>
			<p>{name}</p>
		</div>
	);
};
