"use client";
import axios from "axios";
import { AppError } from "./AppError";

// export const WS_URL = process.env.NEXT_PUBLIC_WS_URL!;
export const WS_URL = process.env.NEXT_PUBLIC_API_URL!;
export const API_URL = process.env.NEXT_PUBLIC_API_URL!;
console.log({ API_URL });

const Api = axios.create({ baseURL: API_URL + "/api", withCredentials: true });

Api.interceptors.response.use(
	(_res) => {
		return _res;
	},
	({ response }) => {
		if (response.status === 404) {
			throw new AppError(response.data.err);
		} else {
			throw new AppError(response.data.err, { show: true });
		}
	}
);

export { Api };
