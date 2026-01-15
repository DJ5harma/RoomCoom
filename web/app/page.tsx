"use client";
import { useUser } from "./context/user.context";

export default function Home() {
	const { user } = useUser();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="">{JSON.stringify(user)}</main>
		</div>
	);
}
