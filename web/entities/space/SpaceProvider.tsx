"use client";

import { Api } from "@/utils/Api";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { SpaceI, uuid } from "@/utils/types";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

const context = createContext<{
	space: SpaceI;
} | null>(null);

export const SpaceProvider = ({
	spaceId,
	children,
	fetchedSpace,
}: {
	spaceId: uuid;
	children: ReactNode;
	fetchedSpace?: SpaceI;
}) => {
	const [space, setSpace] = useState<SpaceI | null>(fetchedSpace ?? null);

	const [loading, setLoading] = useState(!fetchedSpace);

	useEffect(() => {
		if (fetchedSpace) return;
		(async () => {
			const [spaceData] = await Promise.all([Api.get(`/space/${spaceId}`)]);
			setSpace(spaceData.data.space);

			setLoading(false);
		})();
	}, [spaceId, fetchedSpace]);

	if (loading) return <Loading />;
	if (!space) return <NotFound />;
	return <context.Provider value={{ space }}>{children}</context.Provider>;
};

export function useSpace() {
	const x = useContext(context);
	if (!x) throw new Error("useSpace not being used inside a SpaceProvider");
	return x;
}
