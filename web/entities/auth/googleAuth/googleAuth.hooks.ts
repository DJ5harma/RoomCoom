"use client";

import { useState } from "react";
import { GoogleAuthService } from "./googleAuth.service";

export function useGoogleAuth() {
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const signIn = async () => {
		setIsSigningIn(true);
		setError(null);
		try {
			await GoogleAuthService.initiateAuth();
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Failed to sign in";
			setError(errorMessage);
			setIsSigningIn(false);
			throw err;
		}
	};

	return {
		signIn,
		isSigningIn,
		error,
	};
}

