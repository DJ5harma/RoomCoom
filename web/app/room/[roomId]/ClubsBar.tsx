"use client";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Button } from "@/components/ui/Button";
import { ClubForm } from "@/entities/room/ClubForm";
import { useRoom } from "@/entities/room/RoomProvider";
import Image from "next/image";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";

export const ClubsBar = () => {
	const {
		room: { clubs },
		getUserById,
	} = useRoom();

	return (
		<div className="h-full p-2 flex flex-col gap-2 bg-red-950">
			<div>
				<ModalWrapper
					Opener={
						<Button className="bg-red-800 flex items-center">
							<BiPlus size={25} />
							<p>Create Club</p>
						</Button>
					}
				>
					<ClubForm />
				</ModalWrapper>
			</div>
			<p>Clubs:</p>
			{clubs.map(({ club: { id, name, members } }) => {
				return (
					<Link
						key={id}
						className="flex flex-col items-center gap-2 p-2 border rounded-2xl text-wrap"
						href={`/room/${id}`}
					>
						<p className="">{name}</p>
						<div className="flex">
							{members.slice(0, 4).map((memberId) => {
								const clubMember = getUserById(memberId);
								return (
									<Image
										key={clubMember.id}
										src={clubMember.pictureUrl}
										alt={name}
										height={25}
										width={25}
										className="rounded-full"
									/>
								);
							})}
							<p className="pl-1">{members.length > 4 && " ..."}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
