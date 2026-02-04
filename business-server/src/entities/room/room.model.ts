import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { RoomI } from "../../types";

const roomSchema = new mongoose.Schema<RoomI>(
	{
		name: { type: String, required: true },
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
		members: {
			type: [
				{
					user: {
						type: mongoose.Schema.Types.ObjectId,
						ref: MODEL_CONSTANTS.USER,
					},
				},
			],
			default: [],
		},
	},
	{ toJSON: { virtuals: true } },
);

roomSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const ROOM = mongoose.model(MODEL_CONSTANTS.ROOM, roomSchema);
