import { UserRepo } from "./user.repo";

class UserServiceImpl {
	createUser = UserRepo.create;
	findUserById = UserRepo.findById;
	findUserByEmail = UserRepo.findByEmail;
	updateUser = UserRepo.findByIdAndUpdate;
}

export const UserService = new UserServiceImpl();
