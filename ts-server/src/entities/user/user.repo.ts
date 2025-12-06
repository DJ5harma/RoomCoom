import type { User } from "./user";
import { pg } from "../../../config/db";

class UserRepoImpl {
	async create(user: User) {
		//
		const { id, name, email, picture, createdAt, refreshToken } = user;
		await pg`INSERT INTO users 
				(id, name, email, picture, createdAt, refreshToken)
				VALUES
				(${id}, ${name}, ${email}, ${picture}, ${createdAt}, ${refreshToken})
				`;
		return user;
	}
	async findById(userId: string) {
		return (await pg`SELECT * FROM users WHERE id=${userId}`)[0] as
			| User
			| undefined;
	}
	async findByEmail(email: string) {
		return (await pg`SELECT * FROM users WHERE email=${email}`)[0] as
			| User
			| undefined;
	}
	async findByIdAndUpdate(id: string, user: Partial<User>) {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
}

export const UserRepo = new UserRepoImpl();
