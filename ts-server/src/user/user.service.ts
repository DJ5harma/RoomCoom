import type { SavableUser } from "./user.dto";
import { UserRepo } from "./user.repo";

class UserServiceImpl {
	async saveUser(user: SavableUser) {
		return UserRepo.save(user);
	}
}

export const UserService = new UserServiceImpl();
