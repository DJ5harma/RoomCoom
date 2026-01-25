import { USER } from "./user.model";

class UserServiceImpl {
	create = ({
		email,
		name,
		pictureUrl,
	}: {
		email: string;
		name: string;
		pictureUrl?: string;
	}) => USER.create({ name, email, pictureUrl });

	findByEmail = (email: string) => USER.findOne({ email });
	
	findById = (userId: string) => USER.findById(userId);
}

export const UserService = new UserServiceImpl();
