import type { ref_uuid } from "../../../types";

interface MessageI {
	content: string;
	from: ref_uuid;
	container: ref_uuid;
}

export type { MessageI };
