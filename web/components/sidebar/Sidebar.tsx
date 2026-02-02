"use client";
import { useUser } from "@/context/user.context";
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
			className="border-2 border-orange-300 h-screen flex flex-col gap-4 bg-blue-950"
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
								"flex items-center gap-2 p-2 " +
								(pathname === link
									? "bg-green-400 text-black"
									: "bg-black")
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
								"flex items-center gap-2 border-2 p-2 " +
								(pathname === link
									? "bg-green-400 text-black"
									: "border-green-400 bg-black")
							}
						>
							{icon}
							<p>{name}</p>
						</Link>
					);
				})}
		</aside>
	);
};
