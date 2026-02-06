"use client";
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
import { Chatyy } from "./Chatyy";
import { usePlugin } from "../PluginProvider";
import { socket } from "@/utils/SocketConnector";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyPlugin = () => {
	const { easyApi, sourceId } = usePlugin();
	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		easyApi
			.get("/messages")
			.then(({ data: { messages } }) => {
				setMessages(messages);
			})
			.finally(() => {
				setLoadingMessages(false);
			});

		socket.on(sourceId + ":message", (message) => {
			setMessages((p) => [...p, message]);
		});
		return () => {
			socket.off(sourceId + ":message");
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
