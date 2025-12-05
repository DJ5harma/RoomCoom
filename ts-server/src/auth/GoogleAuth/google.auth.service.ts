const WEB_ORIGIN = process.env.WEB_ORIGIN;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GOOGLE_REDIRECT_URI =
	(WEB_ORIGIN ?? "http://localhost:3000") + "/auth/google/callback";
const GOOGLE_AUTH_URI = "https://accounts.google.com/o/oauth2/auth";
const GOOGLE_TOKEN_URI = "https://oauth2.googleapis.com/token";

[GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI, WEB_ORIGIN].forEach((e) => {
	if (!e) {
		const msg = `Google envs not found`;
		console.error(msg);
		throw new Error(msg);
	}
});

interface TokensFromGoogle {
	access_token: string;
	refresh_token: string;
	id_token: string;
	expires_in: string;
}

interface UserProfileFromGoogle {
	id: string;
	email: string;
	name: string;
	picture: string;
}

export const GoogleAuthService = {
	getClientConfig() {
		return {
			GOOGLE_CLIENT_ID,
			GOOGLE_AUTH_URI,
		};
	},
	async getGoogleUserTokens(codeFromUI: string) {
		const tokenResponse = await fetch(GOOGLE_TOKEN_URI, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				code: codeFromUI,
				client_id: GOOGLE_CLIENT_ID,
				client_secret: GOOGLE_CLIENT_SECRET,
				redirect_uri: GOOGLE_REDIRECT_URI,
				grant_type: "authorization_code",
			}),
		});
		const tokens = await tokenResponse.json();
		return tokens as TokensFromGoogle;
	},
	async getUserProfile(tokens: TokensFromGoogle) {
		const userResponse = await fetch(
			"https://www.googleapis.com/oauth2/v2/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.access_token}`,
				},
			}
		);

		const userProfile = await userResponse.json();
		return userProfile as UserProfileFromGoogle;
		// userProfile = { id, email, name, picture, ... }
	},
};
