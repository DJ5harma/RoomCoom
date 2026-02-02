"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Loading } from "@/components/Loading";
import { socket } from "@/context/socket.context";
import { useParams, useSearchParams } from "next/navigation";
import { uuid } from "@/utils/types";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	liveToken: string;
} | null>(null);

export const MeetyyProvider = ({ children }: { children: ReactNode }) => {
	const { roomId } = useParams() as { roomId: uuid };
	const searchParams = useSearchParams();

	const containerId = searchParams.get("containerId");

	const [liveToken, setLiveToken] = useState<string | null>(null);
	const [loadingLiveToken, setLoadingLiveToken] = useState(true);

	useEffect(() => {
		Api.get(`/room/${roomId}/container/${containerId}/meetyy/live-token`)
			.then(({ data: { liveToken } }) => {
				setLiveToken(liveToken);                
			})
			.finally(() => {
				setLoadingLiveToken(false);
			});

		return () => {
			socket.off("chatyy:message");
		};
	}, []);

	if (loadingLiveToken) return <Loading />;
	if (!liveToken) return <NotFound />;
	return <context.Provider value={{ liveToken }}>{children}</context.Provider>;
};

export function useMeetyy() {
	const x = useContext(context);
	if (!x) throw new Error("useMeetyy not being used inside a MeetyyProvider");
	return x;
}
