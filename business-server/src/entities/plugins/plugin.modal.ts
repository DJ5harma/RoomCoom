import mongoose from "mongoose";
import type { PluginI } from "../../types";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const pluginSchema = new mongoose.Schema<PluginI>({
	name: { type: String, required: true, unique: true },
	supportedInstanceTypes: { type: [{ type: String }], default: [] },
	location: { type: String, default: "internal" },
});

export const PLUGIN = mongoose.model(MODEL_CONSTANTS.PLUGIN, pluginSchema);
