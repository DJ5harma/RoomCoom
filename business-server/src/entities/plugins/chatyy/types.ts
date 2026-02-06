import type { ref_uuid, uuid } from "../../../types";

interface MessageI {
	id: uuid;
	content: string;
	from: ref_uuid;
	source: ref_uuid;
}

export type { MessageI };
