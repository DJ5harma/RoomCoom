"use client";
import {
	LiveKitRoom,
	PreJoin,
	VideoConference,
} from "@livekit/components-react";

import "@livekit/components-styles";
import { useMeetyy } from "./meetyy.context";
import { LIVEKIT_URL } from "@/utils/Api";
import { useUser } from "@/context/user.context";

import "./livekit.css";
import { useSearchParams } from "next/navigation";

export function Meetyy() {
	const { liveToken, isJoined, setIsJoined } = useMeetyy();
	const { user } = useUser();

	const searchParams = useSearchParams();
	const showPrejoin = searchParams.get("plugin") === "meetyy";

	if (isJoined)
		return (
			<LiveKitRoom
				token={liveToken}
				serverUrl={LIVEKIT_URL}
				connect={true}
				data-lk-theme="default"
				onDisconnected={() => setIsJoined(false)}
			>
				<VideoConference />
			</LiveKitRoom>
		);
	return (
		<div className="flex flex-col justify-center items-center h-full bg-black">
			<h1>Meeting Onboarding</h1>
			<p>Join as {user.name}</p>
			{showPrejoin && (
				<PreJoin
					onSubmit={() => setIsJoined(true)}
					defaults={{ username: user.name }}
					data-lk-theme="default"
					userLabel={user.name}
					joinLabel="Join Meeting"
				/>
			)}
		</div>
	);
}
