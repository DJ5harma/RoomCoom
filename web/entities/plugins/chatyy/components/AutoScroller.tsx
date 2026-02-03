import { useEffect, useRef } from "react";
import { useChatyy } from "../ChatyyPlugin";

export const AutoScroller = () => {
	const { messages } = useChatyy();

	const bottomRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, [messages.length]);
	return <div ref={bottomRef} />;
};
