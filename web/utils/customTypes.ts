import { RoomI } from "./types";

export type OmittedMembersRoomType = Omit<RoomI, "members">;