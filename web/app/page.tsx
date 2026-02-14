"use client";
import { PluginSidebar } from "@/plugins/PluginSidebar";
import { DirectsBar } from "./DirectsBar";
import { PersonalBar } from "./PersonalBar";
import { RoomsBar } from "./RoomsBar";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center font-mono">
			<div className="h-full">
				<DirectsBar />
			</div>
			<div className="h-full">
				<RoomsBar />
			</div>
			<div className="h-full flex flex-col">
				<PersonalBar />				
			</div>
			<div className="w-full flex justify-center flex-col p-8 gap-4">
				<p className="text-5xl font-semibold bg-linear-to-r p-2 from-blue-500 to-pink-500">Hello!</p>
				<p className="text-2xl">This is a plugin based collaborative and scalable full stack system {`I've`} made</p>
				<p>
					- There are 4 concepts:
					<br />
					Personal, Direct, Room and Club (one or more clubs are in a room)
				</p>
				<p>- `Direct` is a 1 to 1 space</p>
				<p>- `Room` is a multiplayer space</p>
				<p>- `Club` is a multiplayer space inside room</p>
				<p>- `Personal` is a private space only for you</p>


				<p className="text-lg">Every plugin is usable in any kind of space, and every plugin can (if needed) send and receive signals from other any other plugin in that space</p>


				<p className="bg-linear-to-r p-2 from-blue-700 to-pink-900">To get started, go to the Personal ZONE or connect users (by search) or create a room with multiple users</p>
			</div>
		</div>
	);
}
