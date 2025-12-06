import type { SavableUser } from "./user.dto";
import { UserRepo } from "./user.repo";

class UserServiceImpl {
	async saveUser(user: SavableUser) {
		return UserRepo.save(user);
	}
	async findUserByEmail(email: string) {
		return UserRepo.findByEmail(email);
	}
}

export const UserService = new UserServiceImpl();
