import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import { type ContainerI } from "../../types";

const containerSchema = new mongoose.Schema<ContainerI>(
	{
		name: { type: String, required: true },
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: MODEL_CONSTANTS.ROOM,
			required: true,
		},
	},
	{ toJSON: { virtuals: true } },
);

containerSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const CONTAINER = mongoose.model(
	MODEL_CONSTANTS.CONTAINER,
	containerSchema,
);
