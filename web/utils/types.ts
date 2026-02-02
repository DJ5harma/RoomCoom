export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number;

export type PluginI = "chatyy" | "meetyy";

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
}

interface RoomMemberI {
	id: uuid;
	room: ref_uuid;
	user: ref_uuid;
}

interface InstanceI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
	plugin: PluginI;
}

interface InstanceMemberI {
	id: uuid;
	instance: ref_uuid;
	user: ref_uuid;
}

export type { UserI, RoomI, RoomMemberI, InstanceI, InstanceMemberI };
