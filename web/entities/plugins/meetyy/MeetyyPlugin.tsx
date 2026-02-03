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
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { useInstance } from "@/entities/instance/InstanceProvider";
import { Meetyy } from "./Meetyy";

const context = createContext<{
	liveToken: string;
	isJoined: boolean;
	setIsJoined: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const MeetyyPlugin = () => {
	const { instance } = useInstance();

	const [liveToken, setLiveToken] = useState<string | null>(null);
	const [loadingLiveToken, setLoadingLiveToken] = useState(true);

	const [isJoined, setIsJoined] = useState(false);

	useEffect(() => {
		Api.get(`/instance/${instance.id}/meetyy/live-token`)
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
