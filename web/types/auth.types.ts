export type GoogleAuthConfig = {
	GOOGLE_CLIENT_ID: string;
	GOOGLE_AUTH_URI: string;
};

export type SignInResponse = {
	user: import("./user.types").User;
	accessToken: string;
};

