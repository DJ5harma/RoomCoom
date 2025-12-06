import type { NextFunction, Request, Response } from "express";
import type { ApiError } from "../../utils/ApiError";

class ErrorMiddlewareImpl {
	async REST_HANDLER(req: Request, res: Response, next: NextFunction) {
		try {
			await next();
		} catch (error) {
			const err = error as ApiError;
			res.status(err.status).json(err.toJSON);
            return;
		}
	}
}

export const ErrorMiddleware = new ErrorMiddlewareImpl();
