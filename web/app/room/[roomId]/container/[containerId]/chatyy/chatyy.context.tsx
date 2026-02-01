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
import { uuid } from "@/app/types";
import { MessageI } from "./types";
import { Loading } from "@/app/components/Loading";
import { socket } from "@/app/context/socket.context";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyProvider = ({
	roomId,
	containerId,
	children,
}: {
	roomId: uuid;
	containerId: uuid;
	children: ReactNode;
}) => {
	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/container/${containerId}/chatyy`)
			.then(({ data: { messages } }) => {
				setMessages((p) => [...messages, ...p]);
			})
			.finally(() => {
				setLoadingMessages(false);
			});

		socket.on("chatty:message", ({ message }) => {
			setMessages((p) => [...p, message]);
		});
		return () => {
			socket.off("chatty:message");
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
