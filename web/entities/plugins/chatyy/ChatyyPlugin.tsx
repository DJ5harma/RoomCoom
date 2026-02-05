"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { MessageI } from "./types";
import { Loading } from "@/components/Loading";
import { socket } from "@/utils/SocketConnector";
import { Chatyy } from "./Chatyy";
import { useInstance } from "@/entities/instance/InstanceProvider";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyPlugin = () => {
	const { instance } = useInstance();
	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		Api.get(`/instance/${instance.id}/chatyy/get`)
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
			<Chatyy />
		</context.Provider>
	);
};

export function useChatyy() {
	const x = useContext(context);
	if (!x) throw new Error("useChatyy not being used inside a useChatyy");
	return x;
}
