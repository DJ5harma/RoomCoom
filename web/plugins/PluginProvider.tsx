"use client";

import { Data, InstanceType, UserI, uuid } from "@/utils/types";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { useUser } from "../entities/user/UserProvider";
import { useRoom } from "../entities/room/RoomProvider";
import { useSpace } from "../entities/space/SpaceProvider";
import axios, { AxiosInstance } from "axios";
import { API_URL } from "@/utils/Api";
import { socket } from "@/utils/SocketConnector";
import { Socket } from "socket.io-client";

type PluginContextType = {
	members: UserI[];
	easyApi: AxiosInstance;
	sourceId: uuid;
	sendSignalSocket: (stream: string, data?: Data) => void;
	subscribeSignal: (
		stream: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		listener: (...args: any[]) => void,
	) => Socket;
	unsubscribeSignal: (stream: string) => Socket;
};

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
	const userId = user.id;

	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/personal/${userId}`,
		withCredentials: true,
	});
	const members = [user];
	useEffect(() => {
		socket.emit(`join:personal`);
		return () => {
			socket.emit(`leave:personal`);
		};
	}, []);

	const sourceId = user.id;
	return (
		<context.Provider
			value={{
				members,
				easyApi,
				sourceId,
				sendSignalSocket(stream, data) {
					return socket.emit(`${sourceId}:${stream}`, data);
				},
				subscribeSignal(stream, listener) {
					return socket.on(`${sourceId}:${stream}`, listener);
				},
				unsubscribeSignal(stream) {
					return socket.off(`${sourceId}:${stream}`);
				},
			}}
		>
			{children}
		</context.Provider>
	);
};
const DirectPluginProvider = ({ children }: { children: ReactNode }) => {
	const { space } = useSpace();
	const easyApi = axios.create({
		baseURL: `${API_URL}/api/plugin/direct/${space.id}`,
		withCredentials: true,
	});
	const members = space.members;

	const directId = space.id;

	useEffect(() => {
		socket.emit(`join:direct`, { directId });
		return () => {
			socket.emit(`leave:direct`, { directId });
		};
	}, []);

	const sourceId = space.id;

	return (
		<context.Provider
			value={{
				members,
				easyApi,
				sourceId,
				sendSignalSocket(stream, data) {
					return socket.emit(`${sourceId}:${stream}`, data);
				},
				subscribeSignal(stream, listener) {
					return socket.on(`${sourceId}:${stream}`, listener);
				},
				unsubscribeSignal(stream) {
					return socket.off(`${sourceId}:${stream}`);
				},
			}}
		>
			{children}
		</context.Provider>
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

	const sourceId = clubId;

	return (
		<context.Provider
			value={{
				members,
				easyApi,
				sourceId,
				sendSignalSocket(stream, data) {
					return socket.emit(`${sourceId}:${stream}`, data);
				},
				subscribeSignal(stream, listener) {
					return socket.on(`${sourceId}:${stream}`, listener);
				},
				unsubscribeSignal(stream) {
					return socket.off(`${sourceId}:${stream}`);
				},
			}}
		>
			{children}
		</context.Provider>
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

	const sourceId = roomId;

	useEffect(() => {
		socket.emit(`join:room`, { roomId });
		return () => {
			socket.emit(`leave:room`, { roomId });
		};
	}, []);
	return (
		<context.Provider
			value={{
				members,
				easyApi,
				sourceId,
				sendSignalSocket(stream, data) {
					return socket.emit(`${sourceId}:${stream}`, data);
				},
				subscribeSignal(stream, listener) {
					return socket.on(`${sourceId}:${stream}`, listener);
				},
				unsubscribeSignal(stream) {
					return socket.off(`${sourceId}:${stream}`);
				},
			}}
		>
			{children}
		</context.Provider>
	);
};

export const usePlugin = () => {
	const x = useContext(context);
	if (!x) throw new Error("usePlugin should be used inside a PluginProvider");
	return x;
};
