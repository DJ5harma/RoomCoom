import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../../constants/modal.constants";

const groupSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		room: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_CONSTANTS.ROOM, required: true },
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

groupSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const GROUP = mongoose.model(MODEL_CONSTANTS.GROUP, groupSchema);
