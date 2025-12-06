import { date, uuid, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: uuid().notNull().defaultRandom().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	picture: text(),
	createdAt: date().notNull().defaultNow(),
});

export const refreshTokensTable = pgTable("refreshTokens", {
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	token: text().notNull(),
});

export const roomsTable = pgTable("rooms", {
	id: uuid().notNull().defaultRandom().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	createdAt: date().defaultNow().notNull(),
});

export const rooms_usersTable = pgTable("rooms_users", {
	roomId: uuid()
		.notNull()
		.references(() => roomsTable.id),
	userId: uuid()
		.notNull()
		.references(() => usersTable.id),
	joinedAt: date().defaultNow(),
});
