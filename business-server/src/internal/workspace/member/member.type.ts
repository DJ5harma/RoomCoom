import type { uuid } from "../../../types";

export type MemberType = {
	id: uuid;
	room: uuid;
	group: uuid;
	user: uuid;
	createdAt: Date;
	updatedAt: Date;
};