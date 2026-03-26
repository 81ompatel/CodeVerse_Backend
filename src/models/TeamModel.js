const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: { type: String, required: true },
    hackathon: { type: Schema.Types.ObjectId, ref: "hackathon", required: true },
    leader: { type: Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("team", teamSchema);