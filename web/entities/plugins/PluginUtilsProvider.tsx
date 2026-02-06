import { createContext, ReactNode } from "react";
import { usePlugin } from "./PluginProvider";

type PluginUtilsContextType = {
}

const context = createContext(null)

export const PluginUtilsProvider = ({ children }: { children: ReactNode }) => {

    const {members, } = usePlugin();
	
    return <>{children}</>;
};
