import mongoose from "mongoose";
import type { PluginI } from "../../types";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const pluginSchema = new mongoose.Schema<PluginI>({
	name: { type: String, required: true },
	supportedInstanceTypes: { type: [{ type: String }], default: [] },
});

export const PLUGIN = mongoose.model(MODEL_CONSTANTS.PLUGIN, pluginSchema)