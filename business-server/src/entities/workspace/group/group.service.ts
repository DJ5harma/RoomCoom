import type { uuid } from "../../../types";
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
}

export const GroupService = new GroupServiceImpl();
