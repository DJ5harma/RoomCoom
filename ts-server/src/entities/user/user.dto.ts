import type { User, UserInsert } from "./user";

export type CreateUserDTO = Omit<UserInsert, "id" | "createdAt">;

export type TokenizedUserDTO = { userId: User["id"] };

export type ResponseUserDTO = User;
