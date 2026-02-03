"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { uuid } from "@/utils/types";
import { InstanceProvider } from "./InstanceProvider";
import { Instance } from "./Instance";

const context = createContext<{
	activateInstance(instanceId: uuid): void;
	clearInstance(instanceId: uuid): void;
	isInstanceInMemory(instanceId: uuid): boolean;
} | null>(null);

export const InstancesManager = () => {
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
	function clearInstance(instanceId: uuid) {
		setInstancesMap((p) => ({ ...p, [instanceId]: undefined }));
	}

	const isShown = isInstanceInMemory(shownInstanceId);

	return (
		<context.Provider
			value={{ activateInstance, isInstanceInMemory, clearInstance }}
		>
			{isShown ? instancesMap[shownInstanceId] : <>Choose an instance</>}
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
