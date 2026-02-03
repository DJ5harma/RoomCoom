import { useInstancesManager } from "./InstancesManager";
import { useRoom } from "../room/RoomProvider";
import { useUser } from "../user/UserProvider";

export const InstanceSidebar = () => {
	const { personalInstances, directInstances } = useUser();
	const { instances: roomInstances } = useRoom();
	const { isInstanceInMemory } = useInstancesManager();

	const instances = [
		...roomInstances,
		...directInstances,
		...personalInstances,
	];
	return (
		<aside>
			Active:
			{instances
				.filter(({ id }) => isInstanceInMemory(id))
				.map(({ name }) => {
					return <>M: {name}</>;
				})}
			ROOM:
			{roomInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
			DIRECT:
			{directInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
			PERSONAL:
			{personalInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
		</aside>
	);
};
