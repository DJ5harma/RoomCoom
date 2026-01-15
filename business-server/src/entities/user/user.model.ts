import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		provider: { type: String },
		providerId: { type: String },
	},
	{ timestamps: true }
);

userSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const USER = mongoose.model(MODEL_CONSTANTS.USER, userSchema);
