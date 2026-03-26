const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    submission: { type: Schema.Types.ObjectId, ref: "submission", required: true },
    judge: { type: Schema.Types.ObjectId, ref: "user", required: true },
    innovationScore: { type: Number, min:0, max:10, required:true },
    technicalScore: { type: Number, min:0, max:10, required:true },
    uiuxScore: { type: Number, min:0, max:10, required:true },
    presentationScore: { type: Number, min:0, max:10, required:true },
    comments: { type: String, default: "" },
    totalScore: { type: Number }
}, { timestamps: true });

evaluationSchema.pre("save", function(next){
    this.totalScore = this.innovationScore + this.technicalScore + this.uiuxScore + this.presentationScore;
    next();
});

module.exports = mongoose.model("evaluation", evaluationSchema);