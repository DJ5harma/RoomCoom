import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";
import { ContainerService } from "./container.service";

export function ContainerIO(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);

	socket.on("container:connect", async ({ containerId }) => {
		const container = await ContainerService.getContainerById(containerId);
		if (!container) {
			return;
		}
		if (!socket.rooms.has(container.room.toString())) {
			return;
		}
		socket.join(containerId);
	});
	socket.on("container:disconnect", async ({ containerId }) => {
		socket.leave(containerId);
	});
}
