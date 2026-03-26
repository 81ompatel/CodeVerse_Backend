const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    hackathon: { type: Schema.Types.ObjectId, ref: "hackathon", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    team: { type: Schema.Types.ObjectId, ref: "team" },
    certificateLink: { type: String, required: true },
    issuedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("certificate", certificateSchema);