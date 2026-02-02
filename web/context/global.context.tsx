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
import { ContainerI, RoomI, uuid } from "../utils/types";
import { Loading } from "@/components/Loading";

interface RoomMapI {
	[roomId: uuid]: {
		room: RoomI;
		containers: ContainerI[];
	};
}

const context = createContext<{
	roomMap: RoomMapI;
	setRoomMap: Dispatch<SetStateAction<RoomMapI>>;
} | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
	const [roomMap, setRoomMap] = useState<RoomMapI>({});

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Api.get("/user/global-combo")
			.then(({ data: { roomMap } }) => {
				// console.log(roomMap);

				setRoomMap(roomMap);
			})
			.finally(() => setLoading(false));
	}, []);
	if (loading) return <Loading />;
	return (
		<context.Provider value={{ roomMap, setRoomMap }}>
			{children}
		</context.Provider>
	);
};

export function useGlobal() {
	const x = useContext(context);
	if (!x) throw new Error("useGlobal not being used inside a GlobalProvider");
	return x;
}
