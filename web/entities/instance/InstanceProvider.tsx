/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect } from "react";
import { Data, InstanceI, UserI, uuid } from "@/utils/types";
import { ChatyyPlugin } from "../plugins/chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "../plugins/meetyy/MeetyyPlugin";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/utils/SocketConnector";
import { Api, API_URL } from "@/utils/Api";
import axios, { AxiosInstance } from "axios";
import { Socket } from "socket.io-client";

const context = createContext<{
	instance: InstanceI;
	getMemberById: (userId: uuid) => UserI;

	sendToAll: (data: Data) => Promise<{ success: true }>;
	sendToOne: (data: Data, memberId: uuid) => Promise<{ success: true }>;
	sendToSome: (data: Data, memberIds: uuid[]) => Promise<{ success: true }>;

	instanceApi: AxiosInstance;
	subscribe: (fn: (...args: any[]) => void) => Socket;
	unsubscribe: () => Socket;
} | null>(null);

type MemberMap = { [userId: uuid]: UserI };

export const InstanceProvider = ({ instance }: { instance: InstanceI }) => {
	const memberMap = (() => {
		const map: MemberMap = {};
		instance.members.forEach((member) => {
			map[member.id] = member;
		});
		return map;
	})();

	useEffect(() => {
		socket.emit("instance:connect", { instanceId: instance.id });

		return () => {
			socket.emit("instance:disconnect", { instanceId: instance.id });
		};
	}, [instance]);

	if (!instance) return <NotFound />;

	async function sendToAll(payload: Data) {
		return (
			await Api.post(`/instance/${instance.id}/sendToAll`, {
				payload,
			})
		).data;
	}
	async function sendToOne(payload: Data, memberId: uuid) {
		return (
			await Api.post(`/instance/${instance.id}/sendToOne`, {
				payload,
				memberId,
			})
		).data;
	}
	async function sendToSome(payload: Data, memberIds: uuid[]) {
		return (
			await Api.post(`/instance/${instance.id}/sendToOne`, {
				payload,
				memberIds,
			})
		).data;
	}

	const subscribe = (fn: (...args: any[]) => void) =>
		socket.on(instance.id, fn);

	const unsubscribe = () => socket.off(instance.id);

	const instanceApi = axios.create({
		baseURL: `${API_URL}/api/instance/${instance.id}/${instance.plugin.name}`,
		withCredentials: true,
	});
	return (
		<context.Provider
			value={{
				instance,
				getMemberById(userId: uuid) {
					return memberMap[userId];
				},
				sendToAll,
				sendToOne,
				sendToSome,
				instanceApi,
				subscribe,
				unsubscribe,
			}}
		>
			{(() => {
				switch (instance.plugin.name) {
					case "chatyy":
						return <ChatyyPlugin />;
					case "meetyy":
						return <MeetyyPlugin />;
					default:
						return <div>{instance.name} Plugin not made yet</div>;
				}
			})()}
		</context.Provider>
	);
};

export const useInstance = () => {
	const x = useContext(context);
	if (!x) throw new Error("useInstance should be used inside InstanceProvider");
	return x;
};
