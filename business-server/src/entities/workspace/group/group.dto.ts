import type { uuid } from "../../../types"

export type createGroupDTO = {
    room: uuid;
    name: string;
}
export type updateGroupDTO = Partial<createGroupDTO>;