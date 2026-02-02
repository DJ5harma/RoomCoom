"use client";
import {
	LiveKitRoom,
	PreJoin,
	VideoConference,
} from "@livekit/components-react";

import "@livekit/components-styles";
import { useMeetyy } from "./MeetyyProvider";
import { LIVEKIT_URL } from "@/utils/Api";
import { useUser } from "@/entities/user/UserProvider";

import "./livekit.css";
import { useSearchParams } from "next/navigation";

export function Meetyy() {
	const { liveToken, isJoined, setIsJoined } = useMeetyy();
	const { user } = useUser();

	const searchParams = useSearchParams();

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

	const showPrejoin = searchParams.get("plugin") === "meetyy";
	if (!showPrejoin) return;
	return (
		<div className="flex flex-col justify-center items-center h-full bg-black">
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
