"use client";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Button } from "@/components/ui/Button";
import { RoomForm } from "@/entities/room/RoomForm";
import { useUser } from "@/entities/user/UserProvider";
import Image from "next/image";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export const RoomsBar = () => {
	const { rooms } = useUser();

	return (
		<div className="h-full p-2 flex flex-col gap-2 bg-red-950">
			<div>
				<ModalWrapper
					Opener={
						<Button className="bg-red-800 flex items-center">
							<BiPlus size={25} />
							<p>Create Room</p>
						</Button>
					}
				>
					<RoomForm />
				</ModalWrapper>
			</div>
			<p>Your Room Paritipations:</p>
			{rooms.map(({ id, name, members }) => {
				return (
					<Link
						key={id}
						className="flex items-center gap-2 p-2 border rounded-2xl w-fit text-wrap"
						href={`/direct/${id}`}
					>
						{members.slice(0, 3).map((member) => {
							return (
								<div key={member.user.id} className="flex">
									<Image
										src={member.user.pictureUrl}
										alt={name}
										height={15}
										width={15}
										className="rounded-full"
									/>
								</div>
							);
						})}
						<p className="text-sm w-20">{name}</p>
					</Link>
				);
			})}
		</div>
	);
};
