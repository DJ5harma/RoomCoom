import type { User } from "./user";
import type { CreatableUser } from "./user.dto";

class UserRepoImpl {
	async create(user: CreatableUser) {
		//
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
	async findById(userId: string) {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
	async findByEmail(email: string): Promise<User | null> {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
	async findByIdAndUpdate(id: string, user: Partial<User>) {
		return { id: "", email: "", name: "", picture: "" } as User | null;
	}
}

export const UserRepo = new UserRepoImpl();
