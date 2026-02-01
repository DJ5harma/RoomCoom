import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";
import type { UserI } from "../../types";

const userSchema = new mongoose.Schema<UserI>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		pictureUrl: { type: String, required: false },
	},
	{ timestamps: true, toJSON: { virtuals: true } },
);

userSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const USER = mongoose.model(MODEL_CONSTANTS.USER, userSchema);
