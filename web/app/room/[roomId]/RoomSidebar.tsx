import { ModalWrapper } from "@/components/ModalWrapper";
import { InstanceBadge } from "@/entities/instance/InstanceBadge";
import { InstanceForm } from "@/entities/instance/InstanceForm";
import { useInstanceMemory } from "@/entities/instance/InstanceMemory";
import { useRoom } from "@/entities/room/RoomProvider";

export const RoomSidebar = () => {
	const { instances: roomInstances } = useRoom();
	const { isInstanceInMemory } = useInstanceMemory();

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
				.map((instance) => (
					<InstanceBadge key={instance.id} instance={instance} />
				))}
			<p>ROOM:</p>
			{instances
				.filter(({ id }) => !isInstanceInMemory(id))
				.map((instance) => (
					<InstanceBadge key={instance.id} instance={instance} />
				))}
		</aside>
	);
};
