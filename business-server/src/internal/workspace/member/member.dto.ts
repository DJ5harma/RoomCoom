import type { uuid } from "../../../types"

export type createMemberDTO = {
    room: uuid;
    group: uuid;
    user: uuid;
}