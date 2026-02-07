import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLUGIN_MAP } from "./PLUGIN_MAP";

export const PluginSidebar = ({ activePlugin }: { activePlugin: string }) => {
	const pathname = usePathname();

	return (
		<aside className="flex flex-col gap-2">
			{Object.keys(PLUGIN_MAP).map((plugin) => {
				const isActive = activePlugin === plugin;
				return (
					<Link
						className={`p-2 ${isActive ? "bg-green-500" : "bg-white"} text-black`}
						href={`${pathname}?plugin=${plugin}`}
						key={plugin}
					>
						{plugin}
					</Link>
				);
			})}
		</aside>
	);
};
