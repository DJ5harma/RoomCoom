"use client";

import { useUser } from "@/entities/user/user.hooks";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { Footer } from "@/components/shared/Footer";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export default function Home() {
	const { user, isLoading } = useUser();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-black">
				<div className="relative">
					<LoadingSpinner size="lg" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="h-16 w-16 rounded-full border-2 border-cyan-500/20 animate-pulse"></div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-white relative overflow-hidden">
			{/* Grid pattern background */}
			<div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none"></div>
			
			<Navbar user={user} />
			<HeroSection user={user} />
			<Footer />
		</div>
	);
}
