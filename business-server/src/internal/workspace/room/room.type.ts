import type { uuid } from "../../../types";

export type RoomType = {
	id: uuid;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};