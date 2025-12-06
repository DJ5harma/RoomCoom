"use client";

import { useState, useEffect } from "react";
import { UserService } from "./user.service";
import type { User } from "@/types/user.types";

export function useUser() {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchUser = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await UserService.getCurrentUser();
			if (response.data) {
				setUser(response.data.user);
			} else if (response.error) {
				setError(response.error.message);
				setUser(null);
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to fetch user"
			);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return {
		user,
		isLoading,
		error,
		refetch: fetchUser,
	};
}

