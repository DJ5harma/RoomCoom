"use client";
import { useUser } from "@/entities/user/UserProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { BiHome } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export const Sidebar = () => {
	const pathname = usePathname();

	const { user } = useUser();
	const elements: {
		icon: ReactNode;
		name: string;
		link: string;
	}[] = [
		{
			name: "Home",
			icon: <BiHome size={25} />,
			link: "/",
		},
		{
			name: "Profile",
			icon: user.pictureUrl ? (
				<Image
					src={user.pictureUrl}
					height={25}
					width={25}
					alt={user.name + "'s pic"}
					className="rounded-full"
				/>
			) : (
				<CgProfile size={25} />
			),
			link: "/profile",
		},
	];
	const [isHovered, setIsHovered] = useState(false);

	return (
		<aside
			className="border-2 border-orange-300 h-screen flex flex-col gap-2 bg-linear-to-t from-neutral-900 to-neutral-600 text-white p-1 py-2"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered &&
				elements.map(({ icon, link }) => {
					return (
						<Link
							key={link}
							href={link}
							className={
								"p-2 rounded-xl " +
								(pathname === link ? "bg-green-400 text-black" : "")
							}
						>
							{icon}
						</Link>
					);
				})}
			{isHovered &&
				elements.map(({ name, icon, link }) => {
					return (
						<Link
							key={link}
							href={link}
							className={
								"flex gap-1.5 items-center p-2 rounded-lg " +
								(pathname === link ? "bg-green-400 text-black" : "")
							}
						>
							{icon}
							<p className="text-sm">{name}</p>
						</Link>
					);
				})}
		</aside>
	);
};
