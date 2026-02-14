import { Fragment } from "react/jsx-runtime";
import { useContainer } from "./providers/ContainerProvider";
import { useNodes } from "./providers/NodesProvider";

export const Drawyy = () => {
	const { containerRef, offset } = useContainer();
	const { nodes } = useNodes();

	const elementEntries = Object.entries(nodes);

	return (
		<svg className="border w-full h-full relative" ref={containerRef}>
			<g transform={`translate(${offset[0]} ${offset[1]})`}>
				{elementEntries.map(([key, node]) => (
					<Fragment key={key}>{node}</Fragment>
				))}
			</g>
		</svg>
	);
};
