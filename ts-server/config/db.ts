import { SQL } from "bun";

const POSTGRES_URI = process.env.POSTGRES_URI;

if (!POSTGRES_URI) throw new Error("Postgres uri undefined");

const postgres = new SQL(POSTGRES_URI);
export const pg = postgres;
