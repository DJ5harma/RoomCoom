'use client';
import { useParams } from "next/navigation";
import { useChatyy } from "./chatyy.context";
import { FormEvent } from "react";
import { Api } from "@/utils/Api";
import { useRoomData } from "../../../context/roomData.context";
import { Message } from "./components/Message";

export default function Page() {
	const { roomId, containerId } = useParams();
	const { messages } = useChatyy();
	const { roomMembers } = useRoomData();

	function sendMessage(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const content = formData.get("content");

		Api.post(`/room/${roomId}/container/${containerId}/chatyy/send`, {
			content,
		});
	}

	return (
		<div>
			{messages.map((message) => {
				return (
					<div key={message.id}>
						<Message message={message} />
					</div>
				);
			})}
			<form onSubmit={sendMessage}>
				<input type="text" name="content" />
				<button type="submit">Send</button>
			</form>
		</div>
	);
}
