"use client";
import { InstanceI } from "@/utils/types";
import Link from "next/link";

export const InstanceBadge = ({
	instance,
	href,
}: {
	instance: InstanceI;
	href: string;
}) => {
	return (
		<Link
			href={href}
			className="bg-white text-black rounded-xl cursor-pointer w-full p-2 flex items-center justify-between gap-2"
		>
			<p className="text-md">{instance.name}</p>
			<p className="text-xs bg-black text-white p-1 rounded-full">
				{instance.plugin.name}
			</p>
		</Link>
	);
};
