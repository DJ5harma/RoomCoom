"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { uuid } from "@/utils/types";
import { InstanceProvider } from "./InstanceProvider";
import { Instance } from "./Instance";

const context = createContext<{
	activateInstance(instanceId: uuid): void;
	hideCurrentInstance(): void;
	clearInstance(instanceId: uuid): void;
	isInstanceInMemory(instanceId: uuid): boolean;
	ShownInstance: ReactNode;
} | null>(null);

export const InstancesManager = ({ children }: { children: ReactNode }) => {
	const [instancesMap, setInstancesMap] = useState<{
		[instanceId: uuid]: ReactNode;
	}>({});
	const [shownInstanceId, setShownInstanceId] = useState<uuid>("");

	function activateInstance(instanceId: uuid) {
		if (!instancesMap[instanceId]) {
			setInstancesMap((p) => ({
				...p,
				[instanceId]: (
					<InstanceProvider instanceId={instanceId}>
						<Instance />
					</InstanceProvider>
				),
			}));
		}
		setShownInstanceId(instanceId);
	}
	function isInstanceInMemory(instanceId: uuid) {
		return instancesMap[instanceId] ? true : false;
	}
	function hideCurrentInstance() {
		setShownInstanceId("");
	}
	function clearInstance(instanceId: uuid) {
		setInstancesMap((p) => ({ ...p, [instanceId]: undefined }));
	}

	const ShownInstance = instancesMap[shownInstanceId];

	return (
		<context.Provider
			value={{
				activateInstance,
				isInstanceInMemory,
				clearInstance,
				hideCurrentInstance,
				ShownInstance,
			}}
		>
			{children}
		</context.Provider>
	);
};

export function useInstancesManager() {
	const x = useContext(context);
	if (!x)
		throw new Error(
			"useInstancesManager not being used inside a useInstancesManager",
		);
	return x;
}
