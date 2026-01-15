import type { createUserDTO } from "./user.dto";
import { USER } from "./user.model";

class UserServiceImpl {
	async exists(email: string) {
		return await USER.exists({ email });
	}
	async createUser(dto: createUserDTO) {
		const user = await USER.create(dto);
		return user;
	}
}

export const UserService = new UserServiceImpl();
