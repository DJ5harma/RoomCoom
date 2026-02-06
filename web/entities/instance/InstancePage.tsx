import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { useFetchInstance } from "./useFetchInstance";
import { Loading } from "@/components/Loading";
import { NotFound } from "@/components/NotFound";

export default function InstancePage() {
	const { instanceId } = useParams() as { instanceId: uuid };

	const { instance, loading } = useFetchInstance(instanceId);

	if (loading) return <Loading />;
	if (!instance) return <NotFound />;
	return <div>InstancePage</div>;
}
