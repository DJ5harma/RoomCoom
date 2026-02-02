import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { InstanceMemberI } from "../../types";

const instanceMemberSchema = new mongoose.Schema<InstanceMemberI>(
	{
		instance: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.INSTANCE,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.USER,
		},
	},
	{ toJSON: { virtuals: true } },
);

instanceMemberSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const INSTANCE_MEMBER = mongoose.model(
	MODEL_CONSTANTS.INSTANCE_MEMBER,
	instanceMemberSchema,
);
