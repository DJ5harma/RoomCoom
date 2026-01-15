import { toast } from "react-toastify";

export class AppError extends Error {
	constructor(message: string, options?: { show?: boolean }) {
		super(message);
		if (options?.show) toast.error(message);
	}
}
