export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number;

type PluginLocationType = "internal" | "external";
type InstanceType = "personal" | "direct" | "club" | "room";
interface PluginI {
	id: uuid;
	name: string;
	supportedInstanceTypes: InstanceType[];
	location: PluginLocationType;
}

interface SpaceI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
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
	members: { user: UserI }[];
}

export type { PluginI, UserI, RoomI, SpaceI, PluginLocationType, InstanceType };
