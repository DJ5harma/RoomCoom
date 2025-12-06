export function Footer() {
	return (
		<footer className="border-t border-cyan-500/10 bg-black/50 backdrop-blur-sm">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="text-sm text-zinc-500 font-mono">
						&copy; 2024 RoomCoom. Work, play, create—together.
					</div>
					<div className="flex items-center gap-6 text-sm text-zinc-500">
						<a
							href="#"
							className="transition-colors hover:text-cyan-400 font-mono"
						>
							/docs
						</a>
						<a
							href="#"
							className="transition-colors hover:text-cyan-400 font-mono"
						>
							/plugins
						</a>
						<a
							href="#"
							className="transition-colors hover:text-cyan-400 font-mono"
						>
							/api
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
