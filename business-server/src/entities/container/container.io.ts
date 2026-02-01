import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";
import { ContainerService } from "./container.service";

export function ContainerIO(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);

	socket.on("container:connect", async ({ containerId }) => {
		const existsInContainer = await ContainerService.userExistsInContainer({
			userId,
			containerId,
		});

		
		
		if (!existsInContainer) return;
		
		console.log("JOINED CONTAINER");
		socket.join(containerId);
	});
	socket.on("container:disconnect", async ({ containerId }) => {
		socket.leave(containerId);
	});
}
