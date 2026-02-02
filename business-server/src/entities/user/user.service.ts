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

	search = async (search: string) => {
		const users = USER.find({
			$or: [
				{
					name: { $regex: search, $options: "i" },
				},
				{
					email: { $regex: search, $options: "i" },
				},
			],
		});
		return users;
	};
}

export const UserService = new UserServiceImpl();
