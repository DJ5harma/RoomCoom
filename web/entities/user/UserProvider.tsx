"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Api } from "@/utils/Api";
import { Auth } from "@/components/Auth";
import { Loading } from "@/components/Loading";
import { InstanceI, RoomI, UserI } from "@/utils/types";

type RoomWithoutMembersType = Omit<RoomI, "members">;

const context = createContext<{
	user: UserI;
	rooms: RoomWithoutMembersType[];
	directInstances: InstanceI[];
	personalInstances: InstanceI[];
	addRoom: (room: RoomWithoutMembersType) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserI | null>(null);
	const [rooms, setRooms] = useState<RoomWithoutMembersType[]>([]);

	const [directInstances, setDirectInstances] = useState<InstanceI[]>([]);
	const [personalInstances, setPersonalInstances] = useState<InstanceI[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Api.get("/user/me")
			.then(async (userData) => {
				setUser(userData.data.user);

				const [roomsData, personalInstancesData, directInstancesData] =
					await Promise.all([
						Api.get("/user/rooms"),
						Api.get("/user/instances/personal"),
						Api.get("/user/instances/direct"),
					]);
				setRooms(roomsData.data.rooms);
				setPersonalInstances(personalInstancesData.data.instances);
				setDirectInstances(directInstancesData.data.instances);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	if (loading) return <Loading />;
	if (!user) return <Auth />;

	function addRoom(room: RoomWithoutMembersType) {
		setRooms((p) => [...p, room]);
	}

	return (
		<context.Provider
			value={{ user, rooms, addRoom, directInstances, personalInstances }}
		>
			{children}
		</context.Provider>
	);
};

export const useUser = () => {
	const x = useContext(context);
	if (!x) throw new Error("Use context inside the provider only");
	return x;
};
