import type { uuid } from "../../../types";
import { MEMBER } from "../member/member.model";
import type { MemberType } from "../member/member.type";
import type { createGroupDTO, updateGroupDTO } from "./group.dto";
import { GROUP } from "./group.model";

class GroupServiceImpl {
	async createGroup(grp: createGroupDTO) {
		const newGrp = await GROUP.create(grp);
		return newGrp;
	}
	async updateGroupById(grpId: uuid, grp: updateGroupDTO) {
		const newGrp = await GROUP.findByIdAndUpdate(grpId, grp, { new: true });
		return newGrp;
	}
	async getMembersInGroup(groupId: uuid) {
		const members = (await MEMBER.find({ group: groupId })) as MemberType[];
		return members;
	}
}

export const GroupService = new GroupServiceImpl();
