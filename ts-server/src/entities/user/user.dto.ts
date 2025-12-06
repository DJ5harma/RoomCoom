import type { User, UserInsert } from "./user";

export type CreateUserDTO = Omit<
	UserInsert,
	"id" | "refreshToken" | "createdAt"
>;

export type TokenizedUserDTO = { userId: User["id"] };

export type ResponseUserDTO = Omit<User, "refreshToken">;
