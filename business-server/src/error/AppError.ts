import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
	statusCode: number;
	constructor(statusCode: number, message: string) {
		super(message);
		this.statusCode = statusCode;
	}

	static ExpressErrorHandler(
		err: AppError,
		_req: Request,
		res: Response,
		_next: NextFunction
	) {
		// console.error("AppError:", err.message);
		console.error(err.stack);
		res.status(err.statusCode || 500).json({
			err: err.message || "Internal Server Error",
		});
	}
}
