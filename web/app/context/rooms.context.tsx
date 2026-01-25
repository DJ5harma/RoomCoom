import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { RoomType } from "../types/room.type";


const context = createContext<{ rooms: RoomType[] } | null>(null);

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
	const [rooms, setRooms] = useState<RoomType[]>([]);
	useEffect(() => {
		Api.get("/user/rooms").then(({ data: { rooms } }) => setRooms(rooms));
	}, []);
	return <context.Provider value={{ rooms }}>{children}</context.Provider>;
};

export function useRooms() {
	const x = useContext(context);
	if (!x) throw new Error("useRooms not being used inside a RoomsProvider");
	return x;
}
