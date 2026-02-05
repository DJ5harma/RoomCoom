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
import { useInstance } from "@/entities/instance/InstanceProvider";

const context = createContext<{
	messages: MessageI[];
	setMessages: Dispatch<SetStateAction<MessageI[]>>;
} | null>(null);

export const ChatyyPlugin = () => {
	const { instanceApi, subscribe, unsubscribe } = useInstance();
	const [messages, setMessages] = useState<MessageI[]>([]);
	const [loadingMessages, setLoadingMessages] = useState(true);

	useEffect(() => {
		instanceApi
			.get("/messages")
			.then(({ data: { messages } }) => {
				setMessages(messages);
			})
			.finally(() => {
				setLoadingMessages(false);
			});

		subscribe(({ message }) => {
			setMessages((p) => [...p, message]);
		});
		return () => {
			unsubscribe();
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
