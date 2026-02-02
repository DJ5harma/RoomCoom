import { Chatyy } from "@/plugins/chatyy/Chatyy";
import { useSearchParams } from "next/navigation";

export const RenderCorrectPlugin = () => {
	const searchParams = useSearchParams();
	const plugin = searchParams.get("plugin") as string;
	return (
		<>
			{{
				chatyy: <Chatyy />,
			}[plugin] ?? <Chatyy />}
		</>
	);
};
