"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
	const searchParams = useSearchParams();
	const code = searchParams.get("code");

	useEffect(() => {
		if (!code) {
			console.error("No code found");
			return;
		}
		fetch(`http://localhost:4000/api/auth/google/signin`, {
			method: "POST",
			body: JSON.stringify({ code }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to sign in");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
			});
	}, [code]);
	return <div>Redirecting...</div>;
}
