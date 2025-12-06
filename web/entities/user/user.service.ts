import { apiService, type ApiResponse } from "@/services/api.service";
import type { User, UserResponse } from "@/types/user.types";

class UserServiceImpl {
	async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
		return apiService.request<UserResponse>("/api/user/me", {
			method: "GET",
		});
	}
}

export const UserService = new UserServiceImpl();

