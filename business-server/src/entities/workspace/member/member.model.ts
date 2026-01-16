import mongoose, { Schema } from "mongoose";
import { MODEL_CONSTANTS } from "../../../constants/modal.constants";
import autopopulate from "mongoose-autopopulate";

const memberSchema = new Schema(
	{
		group: { type: Schema.Types.ObjectId, ref: MODEL_CONSTANTS.GROUP, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
			autopopulate: true,
			required: true
		},
	},
	{ timestamps: true }
);

memberSchema.virtual("id").get(function () {
	return this._id.toString();
});

memberSchema.plugin(autopopulate);

export const MEMBER = mongoose.model(MODEL_CONSTANTS.MEMBER, memberSchema);
