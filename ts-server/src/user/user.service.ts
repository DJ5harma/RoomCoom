import type { User } from "./user";
import type { CreatableUser } from "./user.dto";
import { UserRepo } from "./user.repo";

class UserServiceImpl {
	async createUser(user: CreatableUser) {
		return UserRepo.create(user);
	}
	async findUserById(id: string) {
		return UserRepo.findById(id);
	}
	async findUserByEmail(email: string) {
		return UserRepo.findByEmail(email);
	}
	async updateUser(userId: string, user: Partial<User>) {
		return UserRepo.findByIdAndUpdate(userId, user);
	}
}

export const UserService = new UserServiceImpl();
