import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { MemberI } from "../../types";

const memberSchema = new mongoose.Schema<MemberI>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
		joinedAt: { type: Date, default: Date.now() },
		room: { type: mongoose.Schema.Types, ref: MODEL_CONSTANTS.ROOM },
		instance: { type: mongoose.Schema.Types, ref: MODEL_CONSTANTS.INSTANCE },
	},
	{ toJSON: { virtuals: true } },
);

memberSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const MEMBER = mongoose.model(MODEL_CONSTANTS.MEMBER, memberSchema);
