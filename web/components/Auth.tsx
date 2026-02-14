import { API_URL } from "@/utils/Api";
import Image from "next/image";

export const Auth = () => {
	return (
		<div className="flex justify-center items-center min-h-screen bg-linear-to-r p-2 flex-col gap-6">
			<Image src={'/logo.png'} width={100} height={100} alt="Logo" />
			<h3 className="text-5xl font-bold">Welcome to RoomCoom</h3>
			<p className="text-xl">A multi-space plugin based collaboration project</p>
			<code className="border-dotted border-b-2">Just for fun</code>

			<a
				className="bg-white text-black p-4 rounded-xl"
				href={`${API_URL}/api/auth/google`}
			>
				Continue With Google
			</a>
			<a target="_blank" className="bg-linear-to-r from-neutral-700 to-neutral-900 p-2 rounded-xl" href="https://github.com/DJ5harma/RoomCoom">github.com/DJ5harma/RoomCoom</a>
		</div>
	);
};
