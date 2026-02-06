import { useSpace } from "@/entities/space/SpaceProvider";

export default function Page() {
	const { space } = useSpace();

	return <div>{space.name} DIRECT </div>;
}
