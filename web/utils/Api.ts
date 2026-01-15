"use client";
import axios from "axios";
import { AppError } from "./AppError";

export const API_URL = process.env.NEXT_PUBLIC_API_URL! + "/api";
console.log({ API_URL });

const Api = axios.create({ baseURL: API_URL, withCredentials: true });

Api.interceptors.response.use(
	(_res) => {
		return _res;
	},
	({ response }) => {
		if (response.status === 404) {
			window.location.replace(window.location.origin + "/auth");
			throw new AppError(response.data.err);
		} else {
			throw new AppError(response.data.err, { show: true });
		}
	}
);

export { Api };
