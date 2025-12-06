"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoogleAuthService } from "@/entities/auth/googleAuth/googleAuth.service";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function GoogleCallbackPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const code = searchParams.get("code");
	const [status, setStatus] = useState<"loading" | "success" | "error">(
		"loading"
	);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		if (!code) {
			setStatus("error");
			setErrorMessage("No authorization code received");
			return;
		}

		const handleSignIn = async () => {
			try {
				const response = await GoogleAuthService.signIn(code);

				if (response.error) {
					setStatus("error");
					setErrorMessage(
						response.error.message || "Failed to sign in"
					);
					return;
				}

				if (response.data) {
					setStatus("success");
					// Redirect to home after a brief delay
					setTimeout(() => {
						router.push("/");
					}, 1000);
				}
			} catch (error) {
				setStatus("error");
				setErrorMessage(
					error instanceof Error
						? error.message
						: "An unexpected error occurred"
				);
			}
		};

		handleSignIn();
	}, [code, router]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-black px-4">
			<div className="w-full max-w-md">
				<div className="relative rounded-xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-xl p-8 shadow-lg shadow-cyan-500/10 overflow-hidden">
					{/* Grid pattern overlay */}
					<div className="absolute inset-0 grid-pattern opacity-20"></div>
					
					{/* Glowing border effect */}
					<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 blur-xl"></div>
					
					<div className="relative z-10">
						{status === "loading" && (
							<div className="text-center">
								<LoadingSpinner size="lg" className="mb-6" />
								<h2 className="text-xl font-semibold text-white mb-2">
									Initializing connection...
								</h2>
								<p className="text-sm text-zinc-400 font-mono">
									Authenticating with RoomCoom
								</p>
							</div>
						)}

						{status === "success" && (
							<div className="text-center">
								<div className="inline-flex items-center justify-center h-12 w-12 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30">
									<svg
										className="h-6 w-6 text-cyan-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">
									Connection established
								</h2>
								<p className="text-sm text-zinc-400 font-mono">
									Redirecting to RoomCoom...
								</p>
							</div>
						)}

						{status === "error" && (
							<div className="text-center">
								<div className="inline-flex items-center justify-center h-12 w-12 mb-4 rounded-full bg-red-500/10 border border-red-500/30">
									<svg
										className="h-6 w-6 text-red-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">
									Connection failed
								</h2>
								<p className="text-sm text-zinc-400 mb-6 font-mono">
									{errorMessage}
								</p>
								<button
									onClick={() => router.push("/")}
									className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm px-4 text-sm font-medium text-cyan-100 transition-all hover:border-cyan-500/50 hover:from-cyan-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-cyan-500/20"
								>
									Return to Home
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
