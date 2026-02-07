"use client";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Button } from "@/components/ui/Button";
import { useUser, useUserDirectSpaces } from "@/entities/user/UserProvider";
import { UserSearch } from "@/entities/user/UserSearch";
import { UserI } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";

export const DirectsBar = () => {
	const { directSpaces } = useUserDirectSpaces();
	const { user } = useUser();

	function handleUserSearchSelection(users: UserI[]) {
		console.log("logged:", { users });

		if (users.length !== 1) return;
		const peer = users[0];
		for (const ds of directSpaces) {
			for (const member of ds.members) {
				if (member.id === peer.id) {
					router.push(`/direct/${ds.id}`);
					return;
				}
			}
		}
		router.push(`/direct/connect/${peer.id}`);
	}

	const router = useRouter();
	return (
		<div className="h-full p-2 flex flex-col gap-2 bg-blue-950">
			<div>
				<ModalWrapper
					Opener={
						<Button className="bg-blue-800 flex items-center">
							<BiSearch size={25} />
							<p>Connect user +</p>
						</Button>
					}
				>
					<UserSearch onSelected={handleUserSearchSelection} selectLimit={1} />
				</ModalWrapper>
			</div>
			<p>Your Direct Connections:</p>
			{directSpaces.map(({ id, name, members }) => {
				const peer = members.filter(({ id }) => id !== user.id)[0];
				return (
					<Link
						key={id}
						className="flex items-center gap-2 p-2 border rounded-2xl text-wrap bg-blue-900"
						href={`/direct/${id}`}
					>
						<Image
							src={peer.pictureUrl}
							alt={name}
							height={50}
							width={50}
							className="rounded-full"
						/>
						<p className="text-sm w-20">{peer.name}</p>
					</Link>
				);
			})}
		</div>
	);
};
