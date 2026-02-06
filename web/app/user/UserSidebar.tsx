"use client";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InstanceBadge } from "@/entities/instance/InstanceBadge";
import { InstanceForm } from "@/entities/instance/InstanceForm";
import { useInstanceMemory } from "@/entities/instance/InstanceMemory";
import { useUser } from "@/entities/user/UserProvider";

export const UserSidebar = () => {
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
