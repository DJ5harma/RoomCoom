"use client";
import { useSearchParams } from "next/navigation";
import { Chatyy } from "../../../../plugins/chatyy/Chatyy";

export default function Page() {
	const searchParams = useSearchParams();
	const plugin = searchParams.get("plugin");

	return {
		chatyy: <Chatyy />,
	}[plugin ?? "chatyy"];
}
