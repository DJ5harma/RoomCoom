"use client";
import { uuid } from "@/utils/types";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { BiArrowBack, BiChat, BiVideo } from "react-icons/bi";

export const ToolsSidebar = () => {
	const searchParams = useSearchParams();
	const { roomId } = useParams() as { roomId: uuid };
	const instanceId = searchParams.get("instanceId");

	const BASE_ROOM = `/room/${roomId}`;
	const BASE_INSTANCE = `/room/${roomId}?instanceId=${instanceId}`;

	const plugin = searchParams.get("plugin");

	const elements: {
		icon: ReactNode;
		name: string;
		link: string;
		highlight: boolean;
	}[] = [
		{
			name: "Back",
			icon: <BiArrowBack size={25} />,
			link: BASE_ROOM,
			highlight: false,
		},
		{
			name: "Chatyy",
			icon: <BiChat size={25} />,
			link: BASE_INSTANCE + "&plugin=chatyy",
			highlight: plugin === "chatyy" || !plugin,
		},
		{
			name: "Meetyy",
			icon: <BiVideo size={25} />,
			link: BASE_INSTANCE + "&plugin=meetyy",
			highlight: plugin === "meetyy",
		},
	];
	const [isHovered, setIsHovered] = useState(false);

	return (
		<aside
			className="border-2 border-orange-300 h-screen flex flex-col gap-2 bg-blue-950 p-1 py-2"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{!isHovered &&
				elements.map(({ icon, link, highlight }) => {
					return (
						<Link
							key={link}
							href={link}
							className={
								"p-2 rounded-xl " +
								(highlight ? "bg-green-400 text-black" : "bg-black")
							}
						>
							{icon}
						</Link>
					);
				})}
			{isHovered &&
				elements.map(({ name, icon, link, highlight }) => {
					return (
						<Link
							key={link}
							href={link}
							className={
								"flex gap-1.5 items-center p-2 rounded-lg " +
								(highlight ? "bg-green-400 text-black" : "bg-black")
							}
						>
							{icon}
							<p className="">{name}</p>
						</Link>
					);
				})}
		</aside>
	);
};
