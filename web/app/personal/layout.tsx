"use client";

import { PluginProvider } from "@/entities/plugins/PluginProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <PluginProvider instanceType="personal">{children}</PluginProvider>;
}
