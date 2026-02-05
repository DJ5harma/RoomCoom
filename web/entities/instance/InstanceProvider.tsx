import { createContext, useContext, useEffect } from "react";
import { InstanceI, UserI, uuid } from "@/utils/types";
import { ChatyyPlugin } from "../plugins/chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "../plugins/meetyy/MeetyyPlugin";
import { NotFound } from "@/components/NotFound";
import { socket } from "@/utils/SocketConnector";

const context = createContext<{
	instance: InstanceI;
	getMemberById: (userId: uuid) => UserI;
} | null>(null);

type MemberMap = { [userId: uuid]: UserI };

export const InstanceProvider = ({ instance }: { instance: InstanceI }) => {
	console.log({ instance });

	const memberMap = (() => {
		const map: MemberMap = {};
		instance.members.forEach((member) => {
			map[member.id] = member;
		});
		return map;
	})();

	useEffect(() => {
		socket.emit("instance:connect", { instanceId: instance.id });

		return () => {
			socket.emit("instance:disconnect", { instanceId: instance.id });
		};
	}, [instance]);

	if (!instance) return <NotFound />;

	return (
		<context.Provider
			value={{
				instance,
				getMemberById(userId: uuid) {
					return memberMap[userId];
				},
			}}
		>
			{(() => {
				switch (instance.plugin.name) {
					case "chatyy":
						return <ChatyyPlugin />;
					case "meetyy":
						return <MeetyyPlugin />;
					default:
						return <div>{instance.name} Plugin not made yet</div>;
				}
			})()}
		</context.Provider>
	);
};

export const useInstance = () => {
	const x = useContext(context);
	if (!x) throw new Error("useInstance should be used inside InstanceProvider");
	return x;
};
