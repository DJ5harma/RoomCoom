"use client";
import {
	LiveKitRoom,
	PreJoin,
	VideoConference,
} from "@livekit/components-react";

import "@livekit/components-styles";
import { useMeetyy } from "./MeetyyPlugin";
import { LIVEKIT_URL } from "@/utils/Api";
import { useUser } from "@/entities/user/UserProvider";

import "./livekit.css";

export function Meetyy() {
	const { liveToken, isJoined, setIsJoined } = useMeetyy();
	const { user } = useUser();

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
		<div className="flex flex-col justify-center items-center h-full">
			<h1>Meeting Onboarding</h1>
			<p>Join as {user.name}</p>
			<PreJoin
				onSubmit={() => setIsJoined(true)}
				defaults={{ username: user.name }}
				data-lk-theme="default"
				userLabel={user.name}
				joinLabel="Join Meeting"
			/>
		</div>
	);
}
