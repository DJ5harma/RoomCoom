import { usersTable } from "../../db/schema";
import { pg } from "../../../index";
import { eq } from "drizzle-orm";
import type { User, UserInsert } from "./user";

class UserRepoImpl {
	async create(user: UserInsert) {
		return (await pg.insert(usersTable).values(user).returning())[0];
	}
	async findById(userId: User["id"]) {
		return (
			await pg.select().from(usersTable).where(eq(usersTable.id, userId))
		)[0];
	}
	async findByEmail(email: User["email"]) {
		return (
			await pg.select().from(usersTable).where(eq(usersTable.email, email))
		)[0];
	}
	async findByIdAndUpdate(id: User["id"], user: Partial<UserInsert>) {
		return (
			await pg
				.update(usersTable)
				.set({ ...user })
				.where(eq(usersTable.id, id))
				.returning()
		)[0];
	}
}

export const UserRepo = new UserRepoImpl();
