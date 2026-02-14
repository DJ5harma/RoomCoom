export const Loading = ({ message }: { message?: string }) => {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-linear-to-r from-red-950 to-orange-700">
			<h2 className="text-4xl font-semibold animate-spin -rotate-45">{message ?? "Loading..."}</h2>
		</div>
	);
};
