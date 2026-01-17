'use client';
import { useParams } from "next/navigation";

export default function Page() {
	const { groupId } = useParams() as { groupId: string };
	return <div>grp: {groupId}</div>;
}
