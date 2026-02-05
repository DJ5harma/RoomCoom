import type { ref_uuid, uuid } from "@/utils/types";

interface MessageI {
	id: uuid;
	content: string;
	from: uuid;
	instance: ref_uuid;
}

export type { MessageI };
