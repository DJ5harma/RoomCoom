import { sql } from "bun";

export async function testPostgres() {
    const db = sql.connect()
}
