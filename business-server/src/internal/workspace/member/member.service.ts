import type { uuid } from "../../../types";
import type { createMemberDTO } from "./member.dto";
import { MEMBER } from "./member.model";

class MemberServiceImpl {
    async createMember(member: createMemberDTO){
        const newMember = await MEMBER.create(member);
        return newMember;
    }
    async getMembersWithUserId(userId: uuid){
        const members = await MEMBER.find({user: userId});
    }
}

export const MemberService = new MemberServiceImpl();
