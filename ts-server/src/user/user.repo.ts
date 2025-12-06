import type { User } from "./user";
import type { SavableUser } from "./user.dto";

class UserRepoImpl {
	async save(user: SavableUser) {
		//
		return user;
	}
	async findById(userId: string) {
		return { id: "", email: "", name: "", picture: "" } as User;
	}
}

export const UserRepo = new UserRepoImpl();
