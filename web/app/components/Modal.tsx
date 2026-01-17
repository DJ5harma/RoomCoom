import { ReactNode, useState } from "react";

export function Modal({
	ON_show,
	OFF_show,
}: {
	ON_show: ReactNode;
	OFF_show: ReactNode;
}) {
	const [isActive, setIsActive] = useState(false);

	return (
		<div>
			{isActive && (
				<div
					className="fixed flex justify-center items-center left-0 top-0 w-screen h-screen bg-[rgba(255,255,255,0.5)]"
					onClick={() => setIsActive(false)}
				>
					<div
						className="relative border border-black p-6"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="rounded-full bg-black text-green-500 absolute -top-12 -right-12"
							onClick={() => setIsActive(false)}
						>
							X
						</button>
						<div>{ON_show}</div>
					</div>
				</div>
			)}
			<button onClick={() => setIsActive(true)}>{OFF_show}</button>
		</div>
	);
}
