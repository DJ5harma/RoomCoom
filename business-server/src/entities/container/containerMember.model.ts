import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { ContainerMemberI } from "../../types";

const containerMemberSchema = new mongoose.Schema<ContainerMemberI>(
	{
		container: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.CONTAINER,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
	},
	{ toJSON: { virtuals: true } },
);

containerMemberSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const CONTAINER_MEMBER = mongoose.model(
	MODEL_CONSTANTS.ROOM_MEMBER,
	containerMemberSchema,
);
