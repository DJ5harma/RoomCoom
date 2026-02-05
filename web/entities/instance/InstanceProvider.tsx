import { createContext, useContext } from "react";
import { InstanceI } from "@/utils/types";
import { ChatyyPlugin } from "../plugins/chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "../plugins/meetyy/MeetyyPlugin";
import { NotFound } from "@/components/NotFound";

const context = createContext<{ instance: InstanceI } | null>(null);

export const InstanceProvider = ({ instance }: { instance: InstanceI }) => {
	if (!instance) return <NotFound />;
	console.log({instance});
	

	return (
		<context.Provider value={{ instance }}>
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
