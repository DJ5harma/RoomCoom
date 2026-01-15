import type { createUserDTO } from "./user.dto";
import { USER } from "./user.model";

class UserServiceImpl {
	async exists(email: string) {
		return await USER.exists({ email });
	}
	async create(dto: createUserDTO) {
		const user = await USER.create(dto);
		return user;
	}
	async findByEmail(email: string) {
		const user = await USER.findOne({ email });
		return user;
	}
}

export const UserService = new UserServiceImpl();
