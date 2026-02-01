import type { ref_uuid } from "../../../types";

interface MessageI {
	content: string;
	from: ref_uuid;
	to: ref_uuid;
}

export type { MessageI };
