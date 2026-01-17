import type { createMemberDTO } from "./member.dto";
import { MEMBER } from "./member.model";

class MemberServiceImpl {
    async createMember(member: createMemberDTO){
        const newMember = await MEMBER.create(member);
        return newMember;
    }
}

export const MemberService = new MemberServiceImpl();
