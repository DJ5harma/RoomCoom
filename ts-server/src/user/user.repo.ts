import type { User } from "./user";

class UserRepoImpl {
	async save(user: User) {
		//
		return user;
	}
	async findById(userId: string) {
		return { id: "", email: "", name: "", picture: "" } as User;
	}
}

export const UserRepo = new UserRepoImpl();
