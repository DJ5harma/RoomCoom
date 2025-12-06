import type { User } from "./user";

export type CreatableUser = Omit<User, "id" | "createdAt" | "refreshToken">;

export type TokenizedUser = { userId: string };

export type ResponseUser = Omit<User, "refreshToken">;
