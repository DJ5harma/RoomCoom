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
import { useHelper } from "../useHelper";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyPlugin = () => {
	const { easyApi, subscribeSignal, unsubscribeSignal } = useHelper();
	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		easyApi
			.get("/chatyy/messages")
			.then(({ data: { messages } }) => {
				setMessages(messages);
			})
			.finally(() => {
				setLoadingMessages(false);
			});
		subscribeSignal("chatyy:message", (message) => {
			setMessages((p) => [...p, message]);
		});
		return () => {
			unsubscribeSignal("chatyy:message");
		};
	}, []);

	if (loadingMessages) return <Loading message="Loading Chatyy..." />;
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
