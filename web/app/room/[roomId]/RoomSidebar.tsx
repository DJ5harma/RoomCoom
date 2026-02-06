import { ModalWrapper } from "@/components/ModalWrapper";
import { InstanceForm } from "@/entities/instance/InstanceForm";

export const RoomSidebar = () => {
	return (
		<aside className="h-full flex flex-col">
			<ModalWrapper Opener={<button>Room Instance +</button>}>
				<InstanceForm type="room" />
			</ModalWrapper>
			<ModalWrapper Opener={<button>Space Instance +</button>}>
				<InstanceForm type="space" />
			</ModalWrapper>
		</aside>
	);
};
