"use client";

import type { User } from "@/types/user.types";
import { useGoogleAuth } from "@/entities/auth/googleAuth/googleAuth.hooks";

type NavbarProps = {
	user: User | null;
};

export function Navbar({ user }: NavbarProps) {
	const { signIn, isSigningIn } = useGoogleAuth();

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/10 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 shadow-lg shadow-cyan-500/20">
							<span className="text-sm font-bold text-white">R</span>
							<div className="absolute inset-0 rounded-lg bg-cyan-400/20 animate-pulse"></div>
						</div>
						<span className="text-lg font-bold tracking-tight gradient-text">
							RoomCoom
						</span>
						<div className="hidden sm:flex items-center gap-1.5 ml-4 px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20">
							<div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
							<span className="text-xs font-medium text-cyan-400">ONLINE</span>
						</div>
					</div>
					{user ? (
						<div className="flex items-center gap-3">
							<div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-cyan-500/20 backdrop-blur-sm">
								{user.picture && (
									<img
										src={user.picture}
										alt={user.name}
										className="h-6 w-6 rounded-full ring-2 ring-cyan-500/30"
									/>
								)}
								<span className="text-sm font-medium text-cyan-100">
									{user.name}
								</span>
							</div>
						</div>
					) : (
						<button
							onClick={signIn}
							disabled={isSigningIn}
							className="group relative inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 text-sm font-medium text-cyan-100 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-cyan-500/20 disabled:pointer-events-none disabled:opacity-50"
						>
							{isSigningIn ? (
								<>
									<div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
									<span>Connecting...</span>
								</>
							) : (
								<>
									<span>Sign In</span>
									<svg
										className="h-4 w-4 transition-transform group-hover:translate-x-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</>
							)}
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
