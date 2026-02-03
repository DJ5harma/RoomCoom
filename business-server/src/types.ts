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

interface MemberI {
	id: uuid;
	user: ref_uuid;
	joinedAt: Date;
	room?: ref_uuid;
	instance?: ref_uuid;
}

interface RoomI {
	id: uuid;
	name: string;
	creator: ref_uuid;
}

interface InstanceI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
	plugin: PluginEnum;
}

export type { UserI, RoomI, MemberI, InstanceI };
