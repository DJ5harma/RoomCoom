export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number ;

type PluginLocationType = "internal" | "external";
interface PluginI {
	id: uuid;
	name: string;
	supportedInstanceTypes: InstanceType[];
	location: PluginLocationType;
}

type InstanceType = "room" | "space" | "direct" | "personal";
interface InstanceI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
	type: InstanceType;
	plugin: PluginI;
	members: UserI[];
	state: object;
	creator: UserI;
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

export type {
	PluginI,
	UserI,
	RoomI,
	InstanceI,
	InstanceType,
	PluginLocationType,
};
