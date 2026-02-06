import Image from "next/image";
import { MessageI } from "../types";
import { useUser } from "@/entities/user/UserProvider";
import { useState } from "react";

export const Message = ({
	message,
	isContinuation,
}: {
	message: MessageI;
	isContinuation: boolean;
}) => {
	const { content, from } = message;
	const { user } = useUser();

	const didISend = user.id === from.id;

	const showProfilePic = isContinuation ? false : true;
	const showName = isContinuation ? false : true;

	return (
		<div
			className={"flex gap-2 " + (didISend ? "flex-row-reverse" : "flex-row")}
		>
			{showProfilePic ? (
				<Image
					className="rounded-full size-7"
					src={from.pictureUrl}
					height={25}
					width={25}
					alt={from.name}
				/>
			) : (
				<div className="size-6.25" />
			)}
			{didISend ? (
				<div className="bg-blue-900 text-white flex flex-col gap-2 text-sm p-3 rounded-xl shadow shadow-cyan-200 max-w-4/5">
					{showName && <p className="text-cyan-300">{from.name}</p>}
					<Content content={content} />
				</div>
			) : (
				<div className="bg-neutral-800 text-white flex flex-col gap-2 text-sm p-3 rounded-xl shadow shadow-red-200 max-w-4/5">
					{showName && <p className="text-red-400">{from.name}</p>}
					<Content content={content} />
				</div>
			)}
		</div>
	);
};

const Content = ({ content }: { content: string }) => {
	const THRESHOLD_LENGTH = 800;

	const [shownLength, setShownLength] = useState(THRESHOLD_LENGTH);

	if (content.length <= shownLength) return <span>{content}</span>;

	function showMore() {
		setShownLength((p) => p + THRESHOLD_LENGTH);
	}

	return (
		<>
			<span>{content.slice(0, Math.min(shownLength))} ...</span>
			<span className="text-yellow-300 cursor-pointer" onClick={showMore}>
				show more
			</span>
		</>
	);
};
