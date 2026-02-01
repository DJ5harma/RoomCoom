export type uuid = string;
export type ref_uuid = object | uuid;

export type Data = object | string | number;

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

interface ContainerI {
	id: uuid;
	name: string; // unique in a room
	room: ref_uuid;
}

interface ContainerMemberI {
	id: uuid;
	container: ref_uuid;
	user: ref_uuid;
}

export type { UserI, RoomI, RoomMemberI, ContainerI, ContainerMemberI };
