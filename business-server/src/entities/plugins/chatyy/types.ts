import type { ref_uuid, uuid } from "../../../types";

interface MessageI {
	id: uuid;
	content: string;
	from: ref_uuid;
	instance: ref_uuid;
}

export type { MessageI };
