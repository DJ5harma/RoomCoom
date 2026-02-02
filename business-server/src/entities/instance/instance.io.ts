import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";
import { InstanceService } from "./instance.service";

export function InstanceIO(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);

	socket.on("instance:connect", async ({ instanceId }) => {
		const existsInInstance = await InstanceService.userExistsInInstance({
			userId,
			instanceId,
		});

		
		
		if (!existsInInstance) return;
		
		console.log("JOINED INSTANCE");
		socket.join(instanceId);
	});
	socket.on("instance:disconnect", async ({ instanceId }) => {
		socket.leave(instanceId);
	});
}
