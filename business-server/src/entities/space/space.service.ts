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

	userExistsInSpace = async (userId: uuid, spaceId: uuid) => {
		const exists = await SPACE.exists({
			_id: spaceId,
			members: userId,
		});
		return !!exists;
	};

	getSpace = async (spaceId: uuid) =>
		await SPACE.findById(spaceId).populate(populateOptions);

	getSpacesInRoom = async (roomId: uuid) =>
		await SPACE.find({ room: roomId }).populate(populateOptions);

	getUserSpaces = async (userId: uuid) =>
		await SPACE.find({ members: userId }).populate(populateOptions);
}

export const SpaceService = new SpaceServiceImpl();
