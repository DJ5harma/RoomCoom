import  { useEffect, useState } from "react";
import { socket } from "../context/socket.context";
import { Api } from "@/utils/Api";
import { useRoomData } from "../room/[roomId]/context/roomData.context";

export const TestPlugin = () => {
	const { room } = useRoomData();
	const roomId = room.id;
	const [messages, setMessages] = useState<string[]>([]);

	const [message, setMessage] = useState("");

	useEffect(() => {
		socket.on("test:message", (message) => {
			setMessages((p) => [...p, message]);
		});
	}, []);

	return (
		<div className="border border-red-400 p-4 flex flex-col gap-4">
			{messages.map((m, i) => {
                return <p key={i}>{m}</p>
            } )}
			<input type="text" onChange={(e) => setMessage(e.target.value)} />
			<button
				onClick={() => {
					Api.post(`/room/${roomId}/test/sendMessage`, { data: message });
				}}
			>
				Send Message
			</button>
		</div>
	);
};
