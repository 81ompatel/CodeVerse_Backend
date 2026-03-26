const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    hackathon: { type: Schema.Types.ObjectId, ref: "hackathon", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    team: { type: Schema.Types.ObjectId, ref: "team" }, // optional
    paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    isApproved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("registration", registrationSchema);