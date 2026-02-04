import mongoose from "mongoose";
import { PLUGIN } from "../src/entities/plugins/plugin.modal";
import type { PluginI } from "../src/types";
import { ENV_CONSTANTS } from "../src/constants/env.constants";

const plugins: Omit<PluginI, "id">[] = [
	{
		name: "chatyy",
		location: "internal",
		supportedInstanceTypes: ["direct", "space"],
	},
	{
		name: "meetyy",
		location: "internal",
		supportedInstanceTypes: ["direct", "space", "room"],
	},
];
async function seedInternalPlugins() {
	try {
		const existingPlugins = await PLUGIN.find();
		const remainingPlugins = plugins.filter((p) => {
			for (const e of existingPlugins) {
				if (e.name === p.name) return false;
			}
			return true;
		});

		await PLUGIN.insertMany(
			remainingPlugins.map(
				({ name, location, supportedInstanceTypes }) =>
					new PLUGIN({ name, location, supportedInstanceTypes }),
			),
		);

		console.log("Seeded plugins", remainingPlugins.length);
	} catch (error) {
		console.error(error);
	}
}
mongoose.connect(ENV_CONSTANTS.MONGO_URI).then(seedInternalPlugins).then(mongoose.disconnect);
