import mongoose from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const groupSchema = new mongoose.Schema({
	name: { type: String, required: true },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: MODEL_CONSTANTS.USER }],
});

groupSchema.virtual("id").get(function () {
	return this._id.toString();
});

export const GROUP = mongoose.model(MODEL_CONSTANTS.GROUP, groupSchema);
