import { Api } from "@/utils/Api";
import { uuid } from "@/utils/types";
import { useEffect, useState } from "react";

export function useFetchInstance(instanceId: uuid) {
	const [instance, setInstance] = useState(null);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Api.get(`/instance/${instanceId}`)
			.then(({ data }) => {
				setInstance(data.instance);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return { instance, loading };
}
