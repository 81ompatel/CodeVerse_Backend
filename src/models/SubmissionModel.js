const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    hackathon: { type: Schema.Types.ObjectId, ref: "hackathon", required: true },
    team: { type: Schema.Types.ObjectId, ref: "team", required: true },
    githubLink: { type: String, default: "" },
    fileLink: { type: String, default: "" },
    pptLink: { type: String, default: "" },
    status: { type: String, enum: ["submitted","underReview","rejected"], default: "submitted" },
}, { timestamps: true });

module.exports = mongoose.model("submission", submissionSchema);