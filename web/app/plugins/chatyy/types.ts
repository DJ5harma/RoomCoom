import type { ref_uuid, uuid } from "@/app/types";

interface MessageI {
	id: uuid;
	content: string;
	from: ref_uuid;
	container: ref_uuid;
}

export type { MessageI };
