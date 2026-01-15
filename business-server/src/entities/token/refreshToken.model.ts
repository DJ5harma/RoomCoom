import mongoose, { Schema } from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const refreshTokenSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
			required: true,
		},
		tokenValue: { type: String, required: true },
	},
	{ timestamps: true }
);

export const REFRESH_TOKEN = mongoose.model(
	MODEL_CONSTANTS.REFRESH_TOKEN,
	refreshTokenSchema
);
