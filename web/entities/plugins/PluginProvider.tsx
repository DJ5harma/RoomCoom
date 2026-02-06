import { InstanceType, UserI } from "@/utils/types";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useUser } from "../user/UserProvider";
import { useRoom } from "../room/RoomProvider";
import { useSpace } from "../space/SpaceProvider";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/utils/Api";
import { socket } from "@/utils/SocketConnector";

type PluginContextType = { members: UserI[]; easyApi: AxiosInstance };

const context = createContext<PluginContextType | null>(null);

export const PluginProvider = ({
	instanceType,
	children,
}: {
	instanceType: InstanceType;
	children: ReactNode;
}) => {
	switch (instanceType) {
		case "personal":
			return <PersonalPluginProvider>{children}</PersonalPluginProvider>;
		case "direct":
			return <DirectPluginProvider>{children}</DirectPluginProvider>;
		case "club":
			return <ClubPluginProvider>{children}</ClubPluginProvider>;
		case "room":
			return <RoomPluginProvider>{children}</RoomPluginProvider>;
		default:
			return <>INSTANCE TYPE {instanceType} NOT RECOGNOZED</>;
	}
};

const PersonalPluginProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useUser();
	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/personal`,
		withCredentials: true,
	});
	const members = [user];
	useEffect(() => {
		socket.emit(`join:personal`);
		return () => {
			socket.emit(`leave:personal`);
		};
	}, []);
	return (
		<context.Provider value={{ members, easyApi }}>{children}</context.Provider>
	);
};
const DirectPluginProvider = ({ children }: { children: ReactNode }) => {
	const { space } = useSpace();
	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/direct/${space.id}`,
		withCredentials: true,
	});
	const members = space.members;

	const { user } = useUser();

	const peer = members[0].id === user.id ? members[1] : members[0];

	const peerId = peer.id;
	useEffect(() => {
		socket.emit(`join:direct`, { peerId });
		return () => {
			socket.emit(`leave:direct`, { peerId });
		};
	}, []);
	return (
		<context.Provider value={{ members, easyApi }}>{children}</context.Provider>
	);
};
const ClubPluginProvider = ({ children }: { children: ReactNode }) => {
	const { space } = useSpace();
	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/club/${space.id}`,
		withCredentials: true,
	});
	const members = space.members;

	const clubId = space.id;
	useEffect(() => {
		socket.emit(`join:club`, { clubId });
		return () => {
			socket.emit(`leave:club`, { clubId });
		};
	}, []);
	return (
		<context.Provider value={{ members, easyApi }}>{children}</context.Provider>
	);
};
const RoomPluginProvider = ({ children }: { children: ReactNode }) => {
	const { room } = useRoom();
	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/room/${room.id}`,
		withCredentials: true,
	});
	const members = room.members.map(({ user }) => user);
	const roomId = room.id;
	useEffect(() => {
		socket.emit(`join:room`, { roomId });
		return () => {
			socket.emit(`leave:room`, { roomId });
		};
	}, []);
	return (
		<context.Provider value={{ members, easyApi }}>{children}</context.Provider>
	);
};

export const usePlugin = () => {
	const x = useContext(context);
	if (!x) throw new Error("usePlugin should be used inside a PluginProvider");
	return x;
};
