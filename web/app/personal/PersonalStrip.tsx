import { useUser } from "@/entities/user/UserProvider";
import Image from "next/image";

export const PersonalStrip = () => {
	const {
		user: { name, email, pictureUrl },
	} = useUser();

	return (
		<div className="w-full flex items-center bg-white text-black p-1 gap-5 justify-between">
			<div className="flex items-center gap-2">
				<div className="flex gap-2">
					<p className="font-semibold">Personal: </p>
					<p>{name}</p>
					<p>{email}</p>
				</div>
				<div className="flex gap-1 bg-black rounded-xl p-1">
					<div>
						<Image
							src={pictureUrl}
							width={25}
							height={25}
							alt={name}
							className="rounded-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
