import { usersTable } from "../../db/schema";

export type User = typeof usersTable.$inferSelect;

export type UserInsert = typeof usersTable.$inferInsert;