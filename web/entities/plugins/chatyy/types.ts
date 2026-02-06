import type { UserI, uuid } from "@/utils/types";

interface MessageI {
	id: uuid;
	content: string;
	from: UserI;
	source: uuid;
}

export type { MessageI };
