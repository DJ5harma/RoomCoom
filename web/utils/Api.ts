"use client";

import axios from "axios";
import { AppError } from "./AppError";

const API_URL = process.env.NEXT_PUBLIC_API_URL! + "/api";
const Api = axios.create({ baseURL: API_URL, withCredentials: true });

Api.interceptors.response.use(
	(_res) => {
		return _res;
	},
	({ response: { data } }) => {
		throw new AppError(data.err);
	}
);

export { Api };
