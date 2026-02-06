"use client";

import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { SpaceProvider } from "@/entities/space/SpaceProvider";
import { Api } from "@/utils/Api";
import { SpaceI, uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const { peerId } = useParams() as { peerId: uuid };

	const [space, setSpace] = useState<SpaceI | null>(null);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Api.get(`/user/direct/${peerId}`)
			.then(({ data }) => {
				setSpace(data.space);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) return <Loading />;
	if (!space) return <NotFound />;

	return (
		<SpaceProvider spaceId={space.id} fetchedSpace={space}>
			{children}
		</SpaceProvider>
	);
}
