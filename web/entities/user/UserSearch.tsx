import { Api } from "@/utils/Api";
import { UserI } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const UserSearch = ({
	onSelected,
}: {
	onSelected: (users: UserI[]) => void;
}) => {
	const [foundUsers, setFoundUsers] = useState<UserI[]>([]);

	const [chosenUsers, setChosenUsers] = useState<UserI[]>([]);

	const [query, setQuery] = useState("");

	useEffect(() => {
		if (query.length < 1) return;

		Api.get(`/user/search?q=${query}`).then(({ data: { users } }) => {
			setFoundUsers(users);
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

	return (
		<div>
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>

			{foundUsers.map((user) => {
				return (
					<div
						key={user.id}
						className="flex items-center"
						onClick={() => handleClick(user)}
					>
						<Image
							src={user.pictureUrl}
							width={20}
							height={20}
							alt={user.name}
						/>
						<div>
							<p className="text-lg">{user.name}</p>
							<p>{user.email}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};
