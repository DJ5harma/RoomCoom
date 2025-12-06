export type User = {
	id: string;
	email: string;
	name: string;
	picture: string | null;
	createdAt: string;
};

export type UserResponse = {
	user: User;
};

