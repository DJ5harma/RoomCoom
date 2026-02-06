import { InstanceType, RoomI, UserI } from "@/utils/types";
import { createContext, ReactNode, useContext } from "react";
import { useUser } from "../user/UserProvider";
import { useRoom } from "../room/RoomProvider";
import { useSpace } from "../space/SpaceProvider";

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
			return <DirectPluginProvider>{children}</DirectPluginProvider>;
		case "club":
			return <ClubPluginProvider>{children}</ClubPluginProvider>;
		case "room":
			return <RoomPluginProvider>{children}</RoomPluginProvider>;
		default:
			return <>INSTANCE TYPE {instanceType} NOT RECOGNOZED</>;
	}
};

const PersonalPluginProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useUser();
	const members = [user];
	return <context.Provider value={{ members }}>{children}</context.Provider>;
};
const DirectPluginProvider = ({ children }: { children: ReactNode }) => {
	const { space } = useSpace();
	const members = space.members;
	return <context.Provider value={{ members }}>{children}</context.Provider>;
};
const ClubPluginProvider = ({ children }: { children: ReactNode }) => {
	const { room } = useRoom();
	const { space } = useSpace();
	const members = space.members;
	return (
		<context.Provider value={{ members, room }}>{children}</context.Provider>
	);
};
const RoomPluginProvider = ({ children }: { children: ReactNode }) => {
	const { room } = useRoom();
	const members = room.members.map(({ user }) => user);
	return (
		<context.Provider value={{ members, room }}>{children}</context.Provider>
	);
};

export const usePlugin = () => {
	const x = useContext(context);
	if (!x) throw new Error("usePlugin should be used inside a PluginProvider");
	return x;
};
