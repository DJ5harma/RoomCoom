import type { uuid } from "../../types";
import { USER } from "./user.model";

class UserServiceImpl {
	create = async ({
		email,
		name,
		pictureUrl,
	}: {
		email: string;
		name: string;
		pictureUrl?: string;
	}) => await USER.create({ name, email, pictureUrl });

	findByEmail = async (email: string) => await USER.findOne({ email });

	findById = async (userId: string) => await USER.findById(userId);

	search = async (search: string) => {
		const users = await USER.find({
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

	existsById = async (userId: uuid) =>
		(await USER.findById(userId)) ? true : false;
	existByIds = async (userIds: uuid[]) => {
		const count = await USER.countDocuments({ _id: { $in: userIds } });
		return count === userIds.length;
	};
}

export const UserService = new UserServiceImpl();
