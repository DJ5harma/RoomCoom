export const Loading = ({ message }: { message?: string }) => {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<h2 className="text-4xl font-semibold">{message ?? "Loading..."}</h2>
		</div>
	);
};
