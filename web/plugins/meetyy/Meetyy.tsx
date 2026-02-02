"use client";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";
import { useMeetyy } from "./meetyy.context";
import { LIVEKIT_URL } from "@/utils/Api";

export function Meetyy() {
	const { liveToken, isJoined, setIsJoined } = useMeetyy();

	if (isJoined)
		return (
			<LiveKitRoom
				token={liveToken}
				serverUrl={LIVEKIT_URL}
				connect={true}
				data-lk-theme="default"
			>
				<VideoConference />
			</LiveKitRoom>
		);
	return (
		<div className="flex justify-center items-center h-full bg-black">
			<button onClick={() => setIsJoined(true)} className="border">
				Click me to join the meeting
			</button>
		</div>
	);
}
