import type { createUserDTO } from "./user.dto";
import { USER } from "./user.model";

class UserServiceImpl {
	create = (dto: createUserDTO) => USER.create(dto);
	findByEmail = (email: string) => USER.findOne({ email });
	findById = (userId: string) => USER.findById(userId);
}

export const UserService = new UserServiceImpl();
