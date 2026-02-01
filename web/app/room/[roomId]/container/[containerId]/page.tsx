"use client";

import { useParams } from "next/navigation";

export default function Page () {
	const { containerId } = useParams();
	return <div>CONTAINER: {containerId}</div>;
};
