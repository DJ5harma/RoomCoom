import { useInstance } from "@/entities/instance/InstanceProvider";
import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { BiSend } from "react-icons/bi";

export const InputBox = () => {
	const { instance } = useInstance();

	function sendMessage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const content = formData.get("content");

		Api.post(`/instance/${instance.id}/chatyy/send`, {
			content,
		});
	}
	return (
		<form
			onSubmit={sendMessage}
			className="w-full border-2 border-amber-200 flex p-1 gap-1"
		>
			<input
				type="text"
				name="content"
				className="flex-1 bg-white text-black"
			/>
			<button type="submit" className="bg-white text-black">
				<BiSend size={25} />
			</button>
		</form>
	);
};
