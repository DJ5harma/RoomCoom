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
import { Loading } from "@/components/Loading";
import { useParams, useSearchParams } from "next/navigation";
import { uuid } from "@/utils/types";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	liveToken: string;
	isJoined: boolean;
	setIsJoined: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const MeetyyProvider = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams();

	const instanceId = searchParams.get("instanceId");

	const [liveToken, setLiveToken] = useState<string | null>(null);
	const [loadingLiveToken, setLoadingLiveToken] = useState(true);

	const [isJoined, setIsJoined] = useState(false);

	useEffect(() => {
		Api.get(`/instance/${instanceId}/meetyy/live-token`)
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
			{children}
		</context.Provider>
	);
};

export function useMeetyy() {
	const x = useContext(context);
	if (!x) throw new Error("useMeetyy not being used inside a MeetyyProvider");
	return x;
}
