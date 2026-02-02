'use client';
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

// import "@livekit/components-styles";
import { useMeetyy } from "./meetyy.context";

export function Meetyy() {
	const { liveToken } = useMeetyy();
	return (
		<LiveKitRoom
			token={liveToken}
			serverUrl="ws://localhost:7880"
			connect={true}
			data-lk-theme="default"
		>
			<VideoConference />
		</LiveKitRoom>
	);
}
