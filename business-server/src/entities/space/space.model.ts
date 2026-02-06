import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { SpaceI } from "../../types";

const spaceSchema = new mongoose.Schema<SpaceI>(
	{
		name: { type: String, required: true },
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
	{ timestamps: true, toJSON: { virtuals: true } },
);

spaceSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const SPACE = mongoose.model(
	MODEL_CONSTANTS.SPACE,
	spaceSchema,
);
