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
}: {
	spaceId: uuid;
	children: ReactNode;
}) => {
	const [space, setSpace] = useState<SpaceI | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const [spaceData] = await Promise.all([Api.get(`/space/${spaceId}`)]);
			setSpace(spaceData.data.space);

			setLoading(false);
		})();
	}, [spaceId]);

	if (loading) return <Loading message="Loading space..." />;
	if (!space) return <NotFound />;
	return <context.Provider value={{ space }}>{children}</context.Provider>;
};

export function useSpace() {
	const x = useContext(context);
	if (!x) throw new Error("useSpace not being used inside a SpaceProvider");
	return x;
}