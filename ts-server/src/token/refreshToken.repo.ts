import { refreshTokensTable } from "../db/schema";
import { pg } from "../../index";
import { eq, and } from "drizzle-orm";
import type { User } from "../entities/user/user";

type RefreshTokenInsert = {
	userId: User["id"];
	token: string;
};

class RefreshTokenRepoImpl {
	async create(refreshToken: RefreshTokenInsert) {
		return (
			await pg
				.insert(refreshTokensTable)
				.values(refreshToken)
				.returning()
		)[0];
	}

	async findByToken(token: string) {
		return (
			await pg
				.select()
				.from(refreshTokensTable)
				.where(eq(refreshTokensTable.token, token))
		)[0];
	}

	async findByUserId(userId: User["id"]) {
		return (
			await pg
				.select()
				.from(refreshTokensTable)
				.where(eq(refreshTokensTable.userId, userId))
		);
	}

	async deleteByToken(token: string) {
		return (
			await pg
				.delete(refreshTokensTable)
				.where(eq(refreshTokensTable.token, token))
				.returning()
		)[0];
	}

	async deleteByUserId(userId: User["id"]) {
		return await pg
			.delete(refreshTokensTable)
			.where(eq(refreshTokensTable.userId, userId))
			.returning();
	}

	async deleteByUserIdAndToken(userId: User["id"], token: string) {
		return (
			await pg
				.delete(refreshTokensTable)
				.where(
					and(
						eq(refreshTokensTable.userId, userId),
						eq(refreshTokensTable.token, token)
					)
				)
				.returning()
		)[0];
	}
}

export const RefreshTokenRepo = new RefreshTokenRepoImpl();

