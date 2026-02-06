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
	name: string;
	members: ref_uuid[];
	state: object;
	creator: ref_uuid;
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
	clubs: { club: ref_uuid }[];
}

export type { PluginI, UserI, RoomI, SpaceI, PluginLocationType, InstanceType };
