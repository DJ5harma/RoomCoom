"use client";

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { Meetyy } from "./Meetyy";
import { usePlugin } from "../PluginProvider";

const context = createContext<{
	liveToken: string;
	isJoined: boolean;
	setIsJoined: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const MeetyyPlugin = () => {
	const [liveToken, setLiveToken] = useState<string | null>(null);
	const [loadingLiveToken, setLoadingLiveToken] = useState(true);
	const { easyApi } = usePlugin();

	const [isJoined, setIsJoined] = useState(false);

	useEffect(() => {
		easyApi
			.get(`/meetyy/liveToken`)
			.then(({ data: { liveToken } }) => {
				setLiveToken(liveToken);
			})
			.finally(() => {
				setLoadingLiveToken(false);
			});
	}, []);

	if (loadingLiveToken) return <Loading />;
	if (!liveToken) return <NotFound />;
	return (
		<context.Provider value={{ liveToken, isJoined, setIsJoined }}>
			<Meetyy />
		</context.Provider>
	);
};

export function useMeetyy() {
	const x = useContext(context);
	if (!x) throw new Error("useMeetyy not being used inside a MeetyyProvider");
	return x;
}
