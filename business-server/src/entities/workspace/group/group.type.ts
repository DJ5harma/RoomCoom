import type { uuid } from "../../../types";
import type { RoomType } from "../room/room.type";

export type GroupType = {
	id: uuid;
	name: string;
	room: RoomType;
    createdAt: Date;
    updatedAt: Date;
};
