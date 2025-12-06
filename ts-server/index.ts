import { drizzle } from "drizzle-orm/node-postgres";
import { server } from "./src/server";

console.log("Hello via Bun!");
const POSTGRES_URI = process.env.POSTGRES_URI;
if (!POSTGRES_URI) throw new Error("Postgres uri undefined");

export const pg = drizzle(POSTGRES_URI);

(async () => {
	try {
		await server();
	} catch (error) {
		console.log((error as Error).stack);
	}
})();
