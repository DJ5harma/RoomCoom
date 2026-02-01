import mongoose from "mongoose";
import type { MessageI } from "../types";
import { MODEL_CONSTANTS } from "../../../../constants/modal.constants";
import { CHATTY_MODEL_CONSTANTS } from "../chatyy.model_constants";

const directMessageSchema = new mongoose.Schema<MessageI>(
	{
		content: { type: String, required: true },
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } },
);

directMessageSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const DIRECT_MESSAGE = mongoose.model(
	CHATTY_MODEL_CONSTANTS.MESSAGE,
	directMessageSchema,
);
