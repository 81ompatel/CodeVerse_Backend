const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    pdfLink: { type: String, default: "" },
    githubTemplate: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    hackathon: { type: Schema.Types.ObjectId, ref: "hackathon", required: true }
}, { timestamps: true });

module.exports = mongoose.model("problemStatement", problemSchema);