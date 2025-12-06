"use client";
export default function Home() {
	function handleGoogleLogin() {
		fetch("http://localhost:4000/api/auth/google/config")
			.then((response) => response.json())
			.then((data) => {
				const { GOOGLE_CLIENT_ID, GOOGLE_AUTH_URI } = data;
				window.location.href = `${GOOGLE_AUTH_URI}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}/auth/callback/google&response_type=code&scope=email profile`;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
					<button
						className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
						onClick={handleGoogleLogin}
					>
						Google Login
					</button>
				</div>
			</main>
		</div>
	);
}
