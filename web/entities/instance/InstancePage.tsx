"use client";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { useFetchInstance } from "./useFetchInstance";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { useEffect } from "react";
import { useInstanceMemory } from "./InstanceMemory";
import { InstanceProvider } from "./InstanceProvider";

export default function InstancePage() {
	const { instanceId } = useParams() as { instanceId: uuid };

	const { activateInstance, getShownNode } = useInstanceMemory();
	const { instance, loading } = useFetchInstance(instanceId);

	useEffect(() => {
		if (!instance) return;
		activateInstance(instance, <InstanceProvider instance={instance} />);
	}, [instance, activateInstance]);

	if (loading) return <Loading />;
	if (!instance) return <NotFound />;

	return <>{getShownNode()}</>;
}
