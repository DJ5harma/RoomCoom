import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { InstanceI } from "../../types";

const instanceSchema = new mongoose.Schema<InstanceI>(
	{
		name: { type: String, required: true },
		type: {
			type: String,
			enum: ["room", "space", "direct", "user"],
			required: true,
		},

		plugin: {
			type: String,
			required: true,
		},

		// null for direct/user contexts
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.ROOM,
			default: null,
			required: false,
		},

		// for group/direct/user
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: MODEL_CONSTANTS.USER,
			},
		],

		state: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
			required: true,
		},
	},
	{ timestamps: true },
);

instanceSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const INSTANCE = mongoose.model(
	MODEL_CONSTANTS.INSTANCE,
	instanceSchema,
);
