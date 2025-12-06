"use client";

import type { User } from "@/types/user.types";
import { useGoogleAuth } from "@/entities/auth/googleAuth/googleAuth.hooks";

type HeroSectionProps = {
	user: User | null;
};

export function HeroSection({ user }: HeroSectionProps) {
	const { signIn, isSigningIn } = useGoogleAuth();

	return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="animate-fade-in-up">
					{/* Badge */}
					<div className="mb-8 flex justify-center">
						<div className="group relative inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-cyan-300 hover:border-cyan-500/50 transition-all">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
								<span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
							</span>
							<span>Everything is realtime</span>
						</div>
					</div>

					{/* Main Heading */}
					<h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center mb-6 leading-tight">
						<span className="gradient-text">Do anything</span>
						<br />
						<span className="text-white">together,</span>
						<br />
						<span className="gradient-text">in real-time</span>
					</h1>

					{/* Subheading */}
					<p className="text-lg sm:text-xl text-center text-zinc-400 mb-4 max-w-3xl mx-auto leading-relaxed">
						Work, play games, share files, brainstorm, code, or just hang out. Add what you need—everything syncs instantly.
						<span className="block mt-2 text-cyan-400 font-mono text-sm">
							Work • Games • Files • Chat • Anything → All realtime
						</span>
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
						{!user ? (
							<>
								<button
									onClick={signIn}
									disabled={isSigningIn}
									className="group relative inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm px-8 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:border-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
								>
									{isSigningIn ? (
										<>
											<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
											<span>Initializing...</span>
										</>
									) : (
										<>
											<svg
												className="h-5 w-5"
												viewBox="0 0 24 24"
												fill="currentColor"
											>
												<path
													d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
													fill="currentColor"
												/>
												<path
													d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
													fill="currentColor"
												/>
												<path
													d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
													fill="currentColor"
												/>
												<path
													d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
													fill="currentColor"
												/>
											</svg>
											Get Started
										</>
									)}
									<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all"></div>
								</button>
								<button className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-8 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-white">
									View Docs
									<svg
										className="h-4 w-4"
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
								</button>
							</>
						) : (
							<button className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm px-8 text-base font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:border-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105">
								Enter RoomCoom
								<svg
									className="h-4 w-4"
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
							</button>
						)}
					</div>
				</div>

				{/* Plugin Architecture Visualization */}
				<PluginVisualization />

				{/* Features Grid */}
				<FeaturesGrid />
			</div>
		</main>
	);
}

function PluginVisualization() {
	return (
		<div className="mb-24 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
			<div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl p-8 md:p-12 overflow-hidden">
				{/* Grid pattern overlay */}
				<div className="absolute inset-0 grid-pattern opacity-30"></div>
				
				{/* Glowing border effect */}
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 blur-xl"></div>
				
				<div className="relative z-10">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold text-white">Add anything, it all works together</h2>
						<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
							<div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
							<span className="text-xs font-mono text-cyan-400">LIVE</span>
						</div>
					</div>
					
					<div className="grid md:grid-cols-3 gap-4">
						{[
							{ name: 'Play Games', desc: 'Multiplayer games, board games, or just hang out together' },
							{ name: 'Share Files', desc: 'Drop files, browse together, everything syncs instantly' },
							{ name: 'Work & Create', desc: 'Chat, whiteboard, code, or build anything together' }
						].map((tool, index) => (
							<div
								key={index}
								className="group relative rounded-xl border border-cyan-500/20 bg-zinc-900/30 backdrop-blur-sm p-6 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
							>
								<div className="flex items-center gap-3 mb-3">
									<div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
										<div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
									</div>
									<h3 className="font-semibold text-white">{tool.name}</h3>
								</div>
								<p className="text-sm text-zinc-400 mb-4">
									{tool.desc}
								</p>
								<div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
									<span>✓ Synced</span>
									<span className="text-zinc-600">•</span>
									<span>✓ Live</span>
								</div>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all"></div>
							</div>
						))}
					</div>
					
					<div className="mt-6 text-center">
						<p className="text-sm text-zinc-500">
							Mix and match. Work, play, create—do whatever you want, together.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function FeaturesGrid() {
	const features = [
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
			title: "Lightning Fast",
			description:
				"Everything happens instantly. No lag, no waiting. See changes as they happen, together.",
			color: "cyan",
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			),
			title: "For Everything",
			description:
				"Work on projects, play games, share files, or just hang out. It all works seamlessly together.",
			color: "purple",
		},
		{
			icon: (
				<svg
					className="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
					/>
				</svg>
			),
			title: "Mix & Match",
			description:
				"Add games, tools, files, or anything else. Build your perfect space, your way.",
			color: "pink",
		},
	];

	const colorClasses = {
		cyan: {
			border: "border-cyan-500/20",
			bg: "bg-gradient-to-br from-cyan-500/10 to-cyan-600/10",
			text: "text-cyan-400",
			hover: "group-hover:from-cyan-500/5 group-hover:to-cyan-600/5",
		},
		purple: {
			border: "border-purple-500/20",
			bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/10",
			text: "text-purple-400",
			hover: "group-hover:from-purple-500/5 group-hover:to-purple-600/5",
		},
		pink: {
			border: "border-pink-500/20",
			bg: "bg-gradient-to-br from-pink-500/10 to-pink-600/10",
			text: "text-pink-400",
			hover: "group-hover:from-pink-500/5 group-hover:to-pink-600/5",
		},
	};

	return (
		<div className="grid sm:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
			{features.map((feature, index) => {
				const colors = colorClasses[feature.color as keyof typeof colorClasses];
				return (
					<div
						key={index}
						className="group relative rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm p-6 transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
					>
						<div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg border ${colors.border} ${colors.bg} ${colors.text}`}>
							{feature.icon}
						</div>
						<h3 className="mb-2 text-lg font-semibold text-white">
							{feature.title}
						</h3>
						<p className="text-sm text-zinc-400 leading-relaxed">
							{feature.description}
						</p>
						<div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-transparent ${colors.hover} transition-all`}></div>
					</div>
				);
			})}
		</div>
	);
}
