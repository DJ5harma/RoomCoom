import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const roomSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		users: {
			type: [
				{ type: mongoose.Schema.Types.ObjectId, ref: MODEL_CONSTANTS.USER },
			],
			default: [],
		},
	},
	{ timestamps: true, toJSON: { virtuals: true } },
);

roomSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const ROOM = mongoose.model(MODEL_CONSTANTS.ROOM, roomSchema);
