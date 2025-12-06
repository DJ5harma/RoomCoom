import { SQL } from "bun";

export async function testPostgres() {
	const pg = new SQL("postgres://sunu:password@localhost:5432/room-coom");
	await pg.connect();

	await pg`DROP TABLE IF EXISTS whether;`;
	await pg`DROP TABLE IF EXISTS cities`;

	await pg`CREATE TABLE IF NOT EXISTS weather  (
                city            varchar(80),
                temp_lo         int,           
                temp_hi         int,           
                prcp            real,          
                date            date
        );`;

	await pg`CREATE TABLE IF NOT EXISTS cities (
                name            varchar(80),
                location        point
            );`;

	const date = new Date();
	await pg`INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, ${
		date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
	});`;
    await pg`INSERT INTO cities VALUES ('New York', '(-194.0, 53.0)');`

    await pg`INSERT INTO weather (city, temp_lo, temp_hi, prcp, date) 
                        VALUES   ()`

	console.log("TEST");
}
