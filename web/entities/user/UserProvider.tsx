"use client";

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Api } from "@/utils/Api";
import { Auth } from "../../components/Auth";
import { toast } from "react-toastify";
import { Loading } from "../../components/Loading";
import { UserI } from "../../utils/types";

const context = createContext<{ user: UserI } | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<UserI | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const loading = toast.loading("Checking authentication...");
		Api.get("/user/me")
			.then(({ data }) => {
				const { user } = data;
				setUser(user);
				toast.success("Authenticated as " + user?.email);
			})
			.finally(() => {
				toast.dismiss(loading);
				setLoading(false);
			});
	}, []);
	if (loading) return <Loading />;
	if (!user) return <Auth />;
	return <context.Provider value={{ user }}>{children}</context.Provider>;
};

export const useUser = () => {
	const x = useContext(context);
	if (!x) throw new Error("Use context inside the provider only");
	return x;
};
