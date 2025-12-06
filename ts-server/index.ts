import { server } from "./src/server";
import { testPostgres } from "./test/testPostgres";

console.log("Hello via Bun!");
server().then(async () => {
	try {
		await testPostgres();
	} catch (error) {
		console.log((error as Error).stack);
	}
});
