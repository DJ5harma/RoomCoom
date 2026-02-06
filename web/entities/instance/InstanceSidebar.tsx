import { useRoom } from "../room/RoomProvider";
import { useUser } from "../user/UserProvider";
import { ModalWrapper } from "@/components/ModalWrapper";
import { InstanceForm } from "./InstanceForm";
import { useInstanceMemory } from "./InstanceMemory";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InstanceBadge } from "./InstanceBadge";

const RoomInstanceSidebar = () => {
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
const NonRoomInstanceSidebar = () => {
	const { personalInstances, directInstances } = useUser();
	const { isInstanceInMemory } = useInstanceMemory();

	const instances = [...directInstances, ...personalInstances];
	return (
		<aside className="h-full border flex flex-col">
			<div className="flex flex-col gap-1 items-center bg-green-950 p-1">
				<Badge className="bg-green-700">Active</Badge>
				{instances
					.filter(({ id }) => isInstanceInMemory(id))
					.map((instance) => (
						<InstanceBadge key={instance.id} instance={instance} />
					))}
			</div>
			<div className="flex flex-col gap-1 items-center bg-red-950 p-1">
				<ModalWrapper Opener={<Button className="bg-red-800">Direct +</Button>}>
					<InstanceForm type="direct" />
				</ModalWrapper>
				{directInstances
					.filter(({ id }) => !isInstanceInMemory(id))
					.map((instance) => (
						<InstanceBadge key={instance.id} instance={instance} />
					))}
			</div>

			<div className="flex flex-col gap-1 items-center bg-blue-950 p-1">
				<ModalWrapper
					Opener={<Button className="bg-blue-800">Personal +</Button>}
				>
					<InstanceForm type="personal" />
				</ModalWrapper>
				{personalInstances
					.filter(({ id }) => !isInstanceInMemory(id))
					.map((instance) => (
						<InstanceBadge key={instance.id} instance={instance} />
					))}
			</div>
		</aside>
	);
};

export const InstanceSidebar = {
	room: RoomInstanceSidebar,
	nonRoom: NonRoomInstanceSidebar,
};
