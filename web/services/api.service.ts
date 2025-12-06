const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type ApiResponse<T> = {
	data?: T;
	error?: {
		message: string;
		statusCode: number;
	};
};

class ApiService {
	private baseUrl: string;

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl;
	}

	protected async request<T>(
		endpoint: string,
		options: {
			method?: string;
			body?: string;
			headers?: Record<string, string>;
		} = {}
	): Promise<ApiResponse<T>> {
		try {
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				...options,
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			const data = await response.json();

			if (!response.ok) {
				return {
					error: {
						message: data.message || "An error occurred",
						statusCode: response.status,
					},
				};
			}

			return { data };
		} catch (error) {
			return {
				error: {
					message:
						error instanceof Error
							? error.message
							: "Network error occurred",
					statusCode: 0,
				},
			};
		}
	}
}

export const apiService = new ApiService();

