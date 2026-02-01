import mongoose from "mongoose";
import type { MessageI } from "../types";
import { MODEL_CONSTANTS } from "../../../../constants/modal.constants";
import { CHATTY_MODEL_CONSTANTS } from "../chatyy.model_constants";

const MessageSchema = new mongoose.Schema<MessageI>(
	{
		content: { type: String, required: true },
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
			required: true,
		},
		container: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.CONTAINER,
			required: true,
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } },
);

MessageSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const MESSAGE = mongoose.model(
	CHATTY_MODEL_CONSTANTS.MESSAGE,
	MessageSchema,
);
