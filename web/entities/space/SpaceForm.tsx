"use client";
import { Api } from "@/utils/Api";
import { FormEvent, useState } from "react";
import { uuid } from "@/utils/types";
import { UserSearch } from "../user/UserSearch";
import { useModal } from "@/components/ModalWrapper";

export const SpaceForm = ({ roomId }: { roomId: uuid }) => {
	const [chosenUserIds, setChosenUserIds] = useState<uuid[]>([]);
	const { close } = useModal();

	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name") as string;

		Api.post(`/space`, {
			name,
			roomId,
			memberIds: chosenUserIds,
		}).then(close);
	}
	return (
		<form onSubmit={createInstance} className="flex flex-col gap-4">
			<h2>Create Space</h2>
			<input
				type="text"
				name="instance-name"
				className="border border-white"
				placeholder="name"
			/>
			<p>Select User(s):</p>
			<UserSearch
				onSelected={(users) => setChosenUserIds(users.map(({ id }) => id))}
			/>
			<button type="submit">Create Instance</button>
		</form>
	);
};
