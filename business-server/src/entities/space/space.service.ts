import { io } from "../../main";
import type { uuid } from "../../types";
import { SPACE } from "./space.model";

const populateOptions = "members";

class SpaceServiceImpl {
	createSpace = async (name: string, creatorId: uuid, memberIds: uuid[]) => {
		return await SPACE.create({
			name,
			creator: creatorId,
			members: memberIds,
		});
	};
	addUserToSpace = async (spaceId: uuid, userId: uuid) => {
		await SPACE.findByIdAndUpdate(spaceId, {
			$addToSet: { members: userId },
		});
		io.to(spaceId).emit(`space:${spaceId}:add:member`, { userId });
	};

	getSpace = async (spaceId: uuid) =>
		await SPACE.findById(spaceId).populate(populateOptions);

	getSpacesInRoom = async (roomId: uuid) =>
		await SPACE.find({ room: roomId }).populate(populateOptions);

	getUserSpaces = async (userId: uuid) =>
		await SPACE.find({ members: userId }).populate(populateOptions);

	userExistsInSpace = async (userId: uuid, spaceId: uuid) => {
		const exists = await SPACE.exists({
			_id: spaceId,
			members: userId,
		});
		return !!exists;
	};
	findExactlyOneTheseMembersSpace = async (memberIds: uuid[], filters?: object) => {
		const space = await SPACE.findOne({
			...filters,
			members: { $all: memberIds, $size: memberIds.length },
		});
		return space;
	};
	doExactlyTheseMembersExistInAnySpace = async (memberIds: uuid[]) => {
		const exists = await SPACE.exists({
			members: { $all: memberIds, $size: memberIds.length },
		});
		return !!exists;
	};
}

export const SpaceService = new SpaceServiceImpl();
