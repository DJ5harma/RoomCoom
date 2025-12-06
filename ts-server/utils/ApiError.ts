export class ApiError extends Error {
	status: number;
	code?: string;
	details?: unknown;

	constructor(
		message: string,
		status = 500,
		options?: { code?: string; details?: unknown }
	) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.code = options?.code;
		this.details = options?.details;

		// Ensure proper prototype chain for TS + Node
		Object.setPrototypeOf(this, new.target.prototype);

		// Ensures stack trace starts at the actual throw point
		Error.captureStackTrace?.(this, ApiError);
	}

	toJSON() {
		return {
			error: this.code ?? "ERR_GENERIC",
			message: this.message,
			status: this.status,
			...(this.details ? { details: this.details } : {}),
		};
	}

	// Convenience helpers
	static badRequest(message = "Bad request", details?: unknown) {
		return new ApiError(message, 400, { code: "BAD_REQUEST", details });
	}

	static unauthorized(message = "Unauthorized", details?: unknown) {
		return new ApiError(message, 401, { code: "UNAUTHORIZED", details });
	}

	static forbidden(message = "Forbidden", details?: unknown) {
		return new ApiError(message, 403, { code: "FORBIDDEN", details });
	}

	static notFound(message = "Not found", details?: unknown) {
		return new ApiError(message, 404, { code: "NOT_FOUND", details });
	}

	static conflict(message = "Conflict", details?: unknown) {
		return new ApiError(message, 409, { code: "CONFLICT", details });
	}

	static internal(message = "Internal server error", details?: unknown) {
		return new ApiError(message, 500, { code: "INTERNAL_ERROR", details });
	}
}
