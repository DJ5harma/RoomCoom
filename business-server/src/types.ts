export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number;

export enum PluginEnum {
	chatyy = "chatyy",
	meetyy = "meetyy",
}

interface UserI {
	id: uuid;
	name: string;
	email: string;
	pictureUrl: string;
}

interface RoomI {
	id: uuid;
	name: string;
	creator: ref_uuid;
	members: { user: ref_uuid }[];
}

interface InstanceI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
	type: "room" | "space" | "direct" | "user";
	plugin: PluginEnum;
	members: uuid[];
	state: object;
	creator: ref_uuid;
}

export type { UserI, RoomI, InstanceI };
