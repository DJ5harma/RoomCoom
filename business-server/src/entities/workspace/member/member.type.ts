import type { uuid } from "../../../types";

export type MemberType = {
	id: uuid;
	user: uuid;
	group: uuid;
	createdAt: Date;
	updatedAt: Date;
};
