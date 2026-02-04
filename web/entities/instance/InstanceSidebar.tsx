import { useInstancesManager } from "./InstancesManager";
import { useRoom } from "../room/RoomProvider";
import { useUser } from "../user/UserProvider";
import { ModalWrapper } from "@/components/ModalWrapper";
import { InstanceForm } from "./InstanceForm";

export const RoomInstanceSidebar = () => {
	const { instances: roomInstances } = useRoom();
	const { isInstanceInMemory } = useInstancesManager();

	const instances = [...roomInstances];
	return (
		<aside className="h-full flex flex-col">
			<ModalWrapper Opener={<button>Room Instance +</button>}>
				<InstanceForm type="room" />
			</ModalWrapper>
			<ModalWrapper Opener={<button>Space Instance +</button>}>
				<InstanceForm type="space" />
			</ModalWrapper>
			<p>Active:</p>
			{instances
				.filter(({ id }) => isInstanceInMemory(id))
				.map(({ name }) => {
					return <>M: {name}</>;
				})}
			<p>ROOM:</p>
			{instances
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
			<ModalWrapper Opener={<button>Personal +</button>}>
				<InstanceForm type="personal" />
			</ModalWrapper>
			<ModalWrapper Opener={<button>Direct +</button>}>
				<InstanceForm type="direct" />
			</ModalWrapper>
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
