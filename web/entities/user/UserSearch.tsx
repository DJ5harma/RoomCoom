import { Api } from "@/utils/Api";
import { UserI } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "./UserProvider";

export const UserSearch = ({
	onSelected,
	selectLimit,
}: {
	onSelected: (users: UserI[]) => void;
	selectLimit?: number;
}) => {
	const [foundUsers, setFoundUsers] = useState<UserI[]>([]);

	const [chosenUsers, setChosenUsers] = useState<UserI[]>([]);

	const [query, setQuery] = useState("");

	useEffect(() => {
		if (query.length < 1) return;

		Api.get(`/user/search?q=${query}`).then(({ data: { users } }) => {
			setFoundUsers(users);
			console.log({ users });
		});
	}, [query]);

	function handleClick(user: UserI) {
		if (chosenUsers.includes(user)) {
			setChosenUsers((p) => p.filter((c) => c.id !== user.id));
		} else {
			setChosenUsers((p) => [...p, user]);
		}
	}
	useEffect(() => {
		onSelected(chosenUsers);
	}, [onSelected, chosenUsers]);

	const allowSearch = selectLimit ? selectLimit > chosenUsers.length : true;

	const { user: myself } = useUser();
	return (
		<div className="flex flex-col gap-4">
			{allowSearch && (
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search user by name / email"
					className="border border-white"
				/>
			)}
			<div className="flex gap-2 bg-white p-1 cursor-pointer">
				{chosenUsers.map((user) => {
					return (
						<div
							key={user.id}
							className="flex gap-2"
							onClick={() => handleClick(user)}
						>
							<Image
								src={user.pictureUrl}
								width={40}
								height={40}
								alt={user.name}
							/>
						</div>
					);
				})}
			</div>
			{allowSearch && (
				<div className="flex flex-col gap-4 p-4">
					{foundUsers.map((user) => {
						if (chosenUsers.includes(user) || user.id === myself.id)
							return null;
						return (
							<div
								key={user.id}
								className="flex items-center gap-2 border p-1 cursor-pointer"
								onClick={() => handleClick(user)}
							>
								<Image
									src={user.pictureUrl}
									width={40}
									height={40}
									alt={user.name}
								/>
								<div>
									<p className="text-md">{user.name}</p>
									<p className="text-sm">{user.email}</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};
