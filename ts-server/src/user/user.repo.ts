import type { User } from "./user";
import type { SavableUser } from "./user.dto";

class UserRepoImpl {
	async save(savableUser: SavableUser) {
		//
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
	async findById(userId: string) {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
	async findByEmail(email: string): Promise<User | null> {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
}

export const UserRepo = new UserRepoImpl();
