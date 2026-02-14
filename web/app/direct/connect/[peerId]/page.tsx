"use client";

import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";
import { Api } from "@/utils/Api";
import { SpaceI, uuid } from "@/utils/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const { peerId } = useParams() as { peerId: uuid };

	const router = useRouter();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Api.get(`/user/direct/${peerId}`)
			.then(({ data }: { data: { space: SpaceI } }) => {
				const spaceId = data.space.id;
				router.push(`/user/direct/${spaceId}`);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [peerId, router]);
    
	if (loading) return <Loading message="Making space for you and them..." />;

	return <NotFound />;
}
