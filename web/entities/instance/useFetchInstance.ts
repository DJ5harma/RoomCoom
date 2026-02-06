import { Api } from "@/utils/Api";
import { PluginI, uuid } from "@/utils/types";
import { useEffect, useState } from "react";

export function useFetchInstance(instanceId: uuid) {
	const [instance, setInstance] = useState(null);
	const [plugins, setPlugins] = useState<PluginI[]>([]);

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		Api.get(`/instance/${instanceId}`)
			.then(({ data }) => {
				setInstance(data.instance);
				setPlugins(data.plugins);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [instanceId]);

	return { loading, instance, plugins };
}
