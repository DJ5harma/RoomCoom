export const DefaultyyPlugin = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full bg-linear-to-r from-cyan-700 to-blue-800 animate-pulse">
			<h2 className="text-3xl font-bold">Welcome!</h2>
			<h3 className="text-xl">
				Please choose a plugin to do something from the sidebar {`-> `}
			</h3>
		</div>
	);
};
