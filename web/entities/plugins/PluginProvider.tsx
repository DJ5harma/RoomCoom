import { InstanceType, RoomI, UserI } from "@/utils/types";
import { createContext, ReactNode, useContext } from "react";
import { useUser } from "../user/UserProvider";

type PluginContextType = { members: UserI[]; room?: RoomI };

const context = createContext<PluginContextType | null>(null);

export const PluginProvider = ({
	instanceType,
	children,
}: {
	instanceType: InstanceType;
	children: ReactNode;
}) => {
	switch (instanceType) {
		case "personal":
			return <PersonalPluginProvider>{children}</PersonalPluginProvider>;
        case "direct":

		default:
			break;
	}
};

const PersonalPluginProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useUser();
	const members = [user];
	return <context.Provider value={{ members }}>{children}</context.Provider>;
};
const DirectPluginProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useUser();
	const members = [user];
	return <context.Provider value={{ members }}>{children}</context.Provider>;
};
const ClubPluginProvider = ({children}: {children: ReactNode}) => {
    
}

export const usePlugin = () => {
	const x = useContext(context);
	if (!x) throw new Error("usePlugin should be used inside a PluginProvider");
	return x;
};
