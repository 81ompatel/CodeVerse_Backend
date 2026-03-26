const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamMemberSchema = new Schema({
    team: { type: Schema.Types.ObjectId, ref: "team", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    role: { type: String, enum: ["member", "leader"], default: "member" },
}, { timestamps: true });

module.exports = mongoose.model("teamMember", teamMemberSchema);