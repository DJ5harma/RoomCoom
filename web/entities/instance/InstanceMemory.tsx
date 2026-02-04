"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { InstanceI, uuid } from "@/utils/types";

type InstanceMap = {
	[instanceId: uuid]: { instance: InstanceI; node: ReactNode };
};

const context = createContext<{
	activateInstance(instance: InstanceI, node: ReactNode): void;
	hideCurrentInstance(): void;
	clearInstance(instanceId: uuid): void;
	isInstanceInMemory(instanceId: uuid): boolean;
	getShownNode(): ReactNode;
} | null>(null);

export const InstanceMemory = ({ children }: { children: ReactNode }) => {
	const [instancesMap, setInstancesMap] = useState<InstanceMap>({});

	const [shownInstanceId, setShownInstanceId] = useState<uuid>("");

	function activateInstance(instance: InstanceI, node: ReactNode) {
		if (!instancesMap[instance.id]) {
			setInstancesMap((p) => ({
				...p,
				[instance.id]: { instance, node },
			}));
		}
		setShownInstanceId(instance.id);
	}
	function isInstanceInMemory(instanceId: uuid) {
		return instancesMap[instanceId] ? true : false;
	}
	function hideCurrentInstance() {
		setShownInstanceId("");
	}
	function clearInstance(instanceId: uuid) {
		setInstancesMap((p) => {
			delete p[instanceId];
			return p;
		});
	}

	const isSomethingShown = instancesMap[shownInstanceId] ? true : false;
	function getShownNode() {
		return isSomethingShown ? instancesMap[shownInstanceId].node : null;
	}

	return (
		<context.Provider
			value={{
				activateInstance,
				isInstanceInMemory,
				clearInstance,
				hideCurrentInstance,
				getShownNode,
			}}
		>
			{children}
		</context.Provider>
	);
};

export function useInstanceMemory() {
	const x = useContext(context);
	if (!x)
		throw new Error(
			"useInstancesManager not being used inside a useInstancesManager",
		);
	return x;
}
