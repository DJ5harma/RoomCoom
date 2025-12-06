import { apiService, type ApiResponse } from "@/services/api.service";
import type { GoogleAuthConfig, SignInResponse } from "@/types/auth.types";

class GoogleAuthServiceImpl {
	async getConfig(): Promise<ApiResponse<GoogleAuthConfig>> {
		return apiService.request<GoogleAuthConfig>("/api/auth/google/config", {
			method: "GET",
		});
	}

	async signIn(code: string): Promise<ApiResponse<SignInResponse>> {
		return apiService.request<SignInResponse>("/api/auth/google/signin", {
			method: "POST",
			body: JSON.stringify({ code }),
		});
	}

	async initiateAuth(): Promise<void> {
		const configResponse = await this.getConfig();
		if (configResponse.error || !configResponse.data) {
			throw new Error(
				configResponse.error?.message || "Failed to get auth config"
			);
		}

		const { GOOGLE_CLIENT_ID, GOOGLE_AUTH_URI } = configResponse.data;
		const redirectUri = `${window.location.origin}/auth/callback/google`;

		const authUrl = `${GOOGLE_AUTH_URI}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;

		window.location.href = authUrl;
	}
}

export const GoogleAuthService = new GoogleAuthServiceImpl();

