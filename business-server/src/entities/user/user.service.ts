import type { createUserDTO } from "./user.dto";
import { USER } from "./user.model";

class UserServiceImpl {
	create = (dto: createUserDTO) => USER.create(dto);
	findByEmail = (email: string) => USER.findOne({ email });
	findById = USER.findById;
}

export const UserService = new UserServiceImpl();
