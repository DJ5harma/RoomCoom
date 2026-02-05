import type { Socket } from "socket.io";
import { AuthState } from "../../auth/auth.state";
import { InstanceService } from "./instance.service";
import { io } from "../../main";
import type { uuid } from "../../types";

export async function InstanceIO(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);

	socket.on("instance:connect", async ({ instanceId }) => {
		const existsInInstance = await InstanceService.userExistsInInstance(
			userId,
			instanceId,
		);

		if (!existsInInstance) return;

		console.log("JOINED INSTANCE");
		socket.join(instanceId);

		socket.on("instance:sendToAll", (data) => {
			try {
				if (data) io.to(instanceId).emit(instanceId, data.payload);
			} catch (error) {
				console.error(error);
			}
		});
		socket.on("instance:sendToOne", (data) => {
			try {
				if (data) io.to(instanceId).emit(instanceId, data.payload);
			} catch (error) {
				console.error(error);
			}
		});
		socket.on("instance:sendToSome", (data) => {
			try {
				(data.memberIds as uuid[]).forEach((memberId) =>
					io.to(memberId).emit(instanceId, data.payload),
				);
			} catch (error) {
				console.error(error);
			}
		});
	});
	socket.on("instance:disconnect", async ({ instanceId }) => {
		socket.leave(instanceId);
	});
}
