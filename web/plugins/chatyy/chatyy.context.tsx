"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { MessageI } from "./types";
import { Loading } from "@/components/Loading";
import { socket } from "@/context/socket.context";
import { useParams, useSearchParams } from "next/navigation";
import { uuid } from "@/utils/types";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyProvider = ({ children }: { children: ReactNode }) => {
	const { roomId } = useParams() as { roomId: uuid };
	const searchParams = useSearchParams();

	const containerId = searchParams.get("containerId");

	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/container/${containerId}/chatyy/get`)
			.then(({ data: { messages } }) => {
				setMessages(messages);
			})
			.finally(() => {
				setLoadingMessages(false);
			});

		socket.on("chatyy:message", ({ message }) => {
			setMessages((p) => [...p, message]);
		});
		return () => {
			socket.off("chatyy:message");
		};
	}, []);

	if (loadingMessages) return <Loading />;
	return (
		<context.Provider value={{ messages, setMessages }}>
			{children}
		</context.Provider>
	);
};

export function useChatyy() {
	const x = useContext(context);
	if (!x) throw new Error("useChatyy not being used inside a useChatyy");
	return x;
}
