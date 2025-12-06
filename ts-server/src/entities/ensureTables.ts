import { pg } from "../../config/db";

export async function ensureTables() {
	await pg`CREATE TABLE IF NOT EXISTS users (
                id           uuid    PRIMARY KEY,
                name         varchar(80) NOT NULL,
                email        varchar(255) NOT NULL UNIQUE,
                picture      text,
                createdAt    date,
                refreshToken text
            )`;

	await pg`CREATE TABLE IF NOT EXISTS rooms (
                id        uuid    PRIMARY KEY,
                name      varchar(50),
                createdAt date
            )`;
	await pg`CREATE TABLE IF NOT EXISTS rooms_users (
                roomId    uuid references rooms(id),
                userId    uuid references users(id),
                joinedAt  date,
                role varchar(20)
            )`;
}
