import { ReactNode, useEffect, useState } from "react";
import { useInstanceMemory } from "./InstanceMemory";
import { useSearchParams } from "next/navigation";
import { Api } from "@/utils/Api";
import { InstanceI } from "@/utils/types";

export const Instance = () => {
	const searchParams = useSearchParams();
	const instanceId = searchParams.get("instanceId");

	return <>...</>


	if(!instanceId) return <></>
};
