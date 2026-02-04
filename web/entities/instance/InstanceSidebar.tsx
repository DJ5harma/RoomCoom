import { useInstancesManager } from "./InstancesManager";
import { useRoom } from "../room/RoomProvider";
import { useUser } from "../user/UserProvider";

export const RoomInstanceSidebar = () => {
	const { instances: roomInstances } = useRoom();
	const { isInstanceInMemory } = useInstancesManager();

	const instances = [...roomInstances];
	return (
		<aside className="h-full flex flex-col">
			<p>Active:</p>
			{instances
				.filter(({ id }) => isInstanceInMemory(id))
				.map(({ name }) => {
					return <>M: {name}</>;
				})}
			<p>ROOM:</p>
			{roomInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
		</aside>
	);
};
export const NonRoomInstanceSidebar = () => {
	const { personalInstances, directInstances } = useUser();
	const { isInstanceInMemory } = useInstancesManager();

	const instances = [...directInstances, ...personalInstances];
	return (
		<aside className="h-full border flex flex-col">
			<p>Active:</p>
			{instances
				.filter(({ id }) => isInstanceInMemory(id))
				.map(({ name }) => {
					return <>M: {name}</>;
				})}
			<p>DIRECT:</p>
			{directInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
			<p>PERSONAL:</p>
			{personalInstances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map(({ name }) => {
					return <>{name}</>;
				})}
		</aside>
	);
};
