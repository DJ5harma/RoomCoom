import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import { type InstanceI } from "../../types";

const instanceSchema = new mongoose.Schema<InstanceI>(
	{
		name: { type: String, required: true },
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.ROOM,
			required: true,
		},
		plugin: {type: String, enum: ["chatyy"] }
	},
	{ toJSON: { virtuals: true } },
);

instanceSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const INSTANCE = mongoose.model(
	MODEL_CONSTANTS.INSTANCE,
	instanceSchema,
);
