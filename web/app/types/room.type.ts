import { uuid } from "../types";
import { UserType } from "./user.type";

export type RoomType = {
	id: uuid;
	name: string;
	users?: (UserType | uuid)[];
	createdAt: string;
};
