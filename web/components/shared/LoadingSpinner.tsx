type LoadingSpinnerProps = {
	size?: "sm" | "md" | "lg";
	className?: string;
};

export function LoadingSpinner({
	size = "md",
	className = "",
}: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4 border-2",
		md: "h-8 w-8 border-2",
		lg: "h-12 w-12 border-[3px]",
	};

	return (
		<div className={`flex items-center justify-center ${className}`}>
			<div
				className={`animate-spin rounded-full ${sizeClasses[size]} border-cyan-500/20 border-t-cyan-400`}
			></div>
		</div>
	);
}
