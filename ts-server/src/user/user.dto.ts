import type { User } from "./user";

export type SavableUser = Omit<User, "id" | "createdAt" | "refreshToken">;
