export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number;

type InstanceType = "room" | "space" | "direct" | "user";

interface PluginI {
	name: string;
	supportedInstanceTypes: InstanceType[];
}

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
	type: InstanceType;
	plugin: PluginEnum;
	members: uuid[];
	state: object;
	creator: ref_uuid;
}

export type { PluginI, UserI, RoomI, InstanceI, InstanceType };
