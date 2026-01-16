import { Schema } from "mongoose";
import { MODEL_CONSTANTS } from "../../constants/modal.constants";

const memberSchema = new Schema({
    group: {type: Schema.Types.ObjectId, ref: MODEL_CONSTANTS.GROUP},
    user: {type: Schema.Types.ObjectId, ref: MODEL_CONSTANTS.USER},
}, {timestamps:true});

