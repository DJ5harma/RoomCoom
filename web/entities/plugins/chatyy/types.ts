import type { ref_uuid, UserI, uuid } from "@/utils/types";

interface MessageI {
	id: uuid;
	content: string;
	from: UserI;
	instance: ref_uuid;
}

export type { MessageI };
