import type { NextFunction, Request, Response } from "express";
import type { Data, InstanceType, uuid } from "../../types";
import { InstanceService } from "./instance.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";
import { UserService } from "../user/user.service";
import { io } from "../../main";
import { PluginService } from "../plugins/plugin.service";

class InstanceControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const instanceId =
			req.body?.instanceId || req.params.instanceId || req.query.instanceId;

		if (!instanceId) {
			next();
			return;
		}
		const existsInInstance = await InstanceService.userExistsInInstance(
			userId,
			instanceId,
		);
		if (!existsInInstance) {
			throw new AppError(403, "Access to instance is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { name, type, roomId, direct_peerId, space_memberIds } = req.body as {
			name: string;
			type: InstanceType;
			roomId?: uuid;
			space_memberIds?: uuid[];
			direct_peerId?: uuid;
		};

		const creatorId = AuthState.getUserId(req);
		let members: uuid[];

		switch (type) {
			case "room":
				members = [];
				if (roomId) break;
				throw new AppError(
					400,
					"roomId field is required for instance of type 'room'",
				);
			case "space":
				members = space_memberIds ?? [];
				if (!members.includes(creatorId)) members.push(creatorId);

				if (roomId) break;
				throw new AppError(
					400,
					"roomId field is required for instance of type 'space'",
				);
			case "direct":
				if (direct_peerId) {
					members = [creatorId, direct_peerId];
					break;
				}
				throw new AppError(
					400,
					"an instance of type 'direct' needs direct_peerId",
				);
			case "personal":
				members = [creatorId];
				break;
			default:
				throw new AppError(
					400,
					`There is no such instance of type '${type}' supported`,
				);
		}
		if (members.length > 0) {
			const membersExist = await UserService.existByIds(members);
			if (!membersExist) {
				throw new AppError(
					400,
					`Not all of the intended members of instance "${type}" exist`,
				);
			}
		}

		const instance = await InstanceService.createInstance(
			name,
			creatorId,
			type,
			{
				roomId,
				members,
			},
		);
		if (type === "room") {
			io.to(roomId!).emit("room:add:instance", { instance });
		}
		res.json({ instance });
	}

	async get(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const instance = await InstanceService.getInstance(instanceId);
		const plugins = await PluginService.getSupportedByInstanceType(
			instance!.type,
		);
		res.json({ instance, plugins });
	}

	async sendToAll(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const { payload } = req.body as { payload: Data };

		io.to(instanceId).emit(instanceId, payload);
		res.json({ success: true });
	}
	async sendToOne(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const { payload, memberId } = req.body as { payload: Data; memberId: uuid };
		io.to(memberId).emit(instanceId, payload);
		res.json({ success: true });
	}
	async sendToSome(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const { payload, memberIds } = req.body as {
			payload: Data;
			memberIds: uuid[];
		};
		memberIds.forEach((memberId) => io.to(memberId).emit(instanceId, payload));
		res.json({ success: true });
	}
}

export const InstanceController = new InstanceControllerImpl();
