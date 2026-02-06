"use client";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InstanceForm } from "@/entities/instance/InstanceForm";

export const UserSidebar = () => {
	return (
		<aside className="h-full border flex flex-col">
			{/* <div className="flex flex-col gap-1 items-center bg-green-950 p-1">
				<Badge className="bg-green-700">Active</Badge>
			</div> */}
			<div className="flex flex-col gap-1 items-center bg-red-950 p-1">
				<ModalWrapper Opener={<Button className="bg-red-800">Direct +</Button>}>
					<InstanceForm type="direct" />
				</ModalWrapper>
			</div>

			<div className="flex flex-col gap-1 items-center bg-blue-950 p-1">
				<ModalWrapper
					Opener={<Button className="bg-blue-800">Personal +</Button>}
				>
					<InstanceForm type="personal" />
				</ModalWrapper>
			</div>
		</aside>
	);
};
