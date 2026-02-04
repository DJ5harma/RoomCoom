import { Api } from "@/utils/Api";
import { PluginI } from "@/utils/types";
import { useEffect, useState } from "react";

export const useFetchPlugins = () => {
	const [plugins, setPlugins] = useState<PluginI[]>([]);

	useEffect(() => {
		Api.get("/public/plugin/all").then(({ data }) => {
			setPlugins(data.plugins);
			console.log(data.plugins);
		});
	}, []);
	return { plugins };
};
