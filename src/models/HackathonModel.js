const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["draft","published","completed"], default: "draft" },
    eventType: { type: String, enum: ["online","offline"], default: "online" },
    paymentType: { type: String, enum: ["free","paid"], default: "free" },
    minTeamSize: { type: Number, default: 1 },
    maxTeamSize: { type: Number, default: 5 },
    registrationStart: { type: Date },
    registrationEnd: { type: Date },
    location: { type: String, default: "" },
    prizeDetails: { type: String, default: "" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" }
}, { timestamps: true });

module.exports = mongoose.model("hackathon", hackathonSchema);