import Link from "next/link";
import { usePathname } from "next/navigation";

const plugins = ["defaultyy", "chatyy", "meetyy"];

export const PluginSidebar = ({ activePlugin }: { activePlugin: string }) => {
	const pathname = usePathname();

	return (
		<aside className="flex flex-col gap-2">
			{plugins.map((plugin) => {
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
