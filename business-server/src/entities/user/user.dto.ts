import type { UserType } from "./user.type";

export type createUserDTO = Omit<UserType, "id" | "createdAt" | "updatedAt">;
