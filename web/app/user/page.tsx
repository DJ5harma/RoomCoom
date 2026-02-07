"use client";
import { Loading } from "@/components/Loading";
import { useUserDirectSpaces } from "@/entities/user/UserProvider";
import React from "react";

export default function Page() {
	const { directSpaces, loading } = useUserDirectSpaces();
  if(loading) return <Loading />
	return (
		<div>
			{directSpaces.map(({ name,  }) => {
				return <div key={name}>{name}</div>;
			})}
		</div>
	);
}
