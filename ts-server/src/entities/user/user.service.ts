import type { User } from "./user";
import { UserRepo } from "./user.repo";

class UserServiceImpl {
	async createUser(user: Omit<User, "createdAt">) {
		const newUser: User = { ...user, createdAt: new Date().toISOString() };
		return UserRepo.create(newUser);
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
