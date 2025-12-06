import { pg } from "../config/db";
import { UserService } from "../src/entities/user/user.service";
import crypto from "crypto";

export async function testPostgres() {
	// await pg.connect();

	// await pg`DROP TABLE weather;`;
	// await pg`DROP TABLE cities`;

	// await UserService.createUser({
	// 	id: crypto.randomUUID() as string,
	// 	email: "sunu@gmail.com",
	// 	name: "SUNU",
	// 	picture: "egin",
	// 	refreshToken: "fwsfwe",
	// });
	const user = await pg`SELECT * FROM users WHERE email='sunu@gmail.com'`;
	const updated = await pg`
	UPDATE users 
	SET name='BILLA' WHERE email='sgfdunu@gmafil.com'
	`;
	console.log({ user, updated });

	// await pg`CREATE TABLE IF NOT EXISTS users (
	//             id        uuid    PRIMARY KEY,
	//             name      varchar(80) NOT NULL,
	//             email     varchar(255) NOT NULL,
	//             picture   text,
	//             createdAt date
	//         )`;

	// await pg`CREATE TABLE IF NOT EXISTS rooms (
	//             id        uuid    PRIMARY KEY,
	//             name      varchar(50),
	//             createdAt date
	//         )`;
	// await pg`CREATE TABLE IF NOT EXISTS rooms_users (
	//             roomId    uuid references rooms(id),
	//             userId    uuid references users(id),
	//             joinedAt  date,
	//             role varchar(20)
	//         )`;
	return;
	// await pg`CREATE TABLE IF NOT EXISTS weather  (
	//             city            varchar(80),
	//             temp_lo         int,
	//             temp_hi         int,
	//             prcp            real,
	//             date            date,
	//     );`;

	// await pg`CREATE TABLE IF NOT EXISTS cities (
	//             name            varchar(80),
	//             location        point
	//         );`;
	// return;
	// const date = new Date().toISOString();
	// // console.log({date});

	// await pg`INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, ${date});`;
	// await pg`INSERT INTO cities VALUES ('New York', '(-194.0, 53.0)');`;

	// await pg`INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
	//                     VALUES   ('KKR', 43.4, 54.3, 43, ${date})`;

	// const weathers = (await pg`SELECT * FROM weather`) as [];
	// // console.log([...weathers])

	// const cus1 =
	// 	await pg`SELECT city, (temp_hi + temp_lo)/2 as temp_avg, date FROM weather WHERE city LIKE 'K%'`;
	// console.log(cus1);

	// console.log("TEST");
}
