import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError";

class ErrorMiddlewareImpl {
	REST_HANDLER(
		err: Error | ApiError,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		console.error(err);
		// If response already sent, delegate to default Express error handler
		if (res.headersSent) {
			return next(err);
		}

		// Handle ApiError instances
		if (err instanceof ApiError) {
			return res.status(err.status).json(err.toJSON());
		}

		// Handle other errors
		const status = 500;
		const message = err.message || "Internal server error";

		return res.status(status).json({
			error: "INTERNAL_ERROR",
			message,
			status,
		});
	}
	NOT_FOUND_HANDLER(req: Request, res: Response, next: NextFunction) {
		res.status(404).json({
			error: "NOT_FOUND",
			message: `Route ${req.method} ${req.path} not found`,
			status: 404,
		});
	}
}

export const ErrorMiddleware = new ErrorMiddlewareImpl();
