import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { RoomMemberI } from "../../types";

const roomMemberSchema = new mongoose.Schema<RoomMemberI>(
	{
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.ROOM,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
	},
	{ toJSON: { virtuals: true } },
);

roomMemberSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const ROOM_MEMBER = mongoose.model(
	MODEL_CONSTANTS.ROOM_MEMBER,
	roomMemberSchema,
);
