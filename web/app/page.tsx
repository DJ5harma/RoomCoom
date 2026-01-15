"use client";
import { Api } from "@/utils/Api";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		Api.get("/user/me").then(({ data }) => {
			console.log(data);
		});
	}, []);
	return (
		<div className="flex min-h-screen items-center justify-center">
			<main className="">
				hello
			</main>
		</div>
	);
}
