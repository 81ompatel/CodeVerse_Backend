const Evaluation = require("../models/EvaluationModel");

const addEvaluation = async (req, res) => {
    try {
        const { submission, innovationScore, technicalScore, uiuxScore, presentationScore, comments } = req.body;
        const judgeId = req.user.id;
        
        // Upsert logic for judges (one evaluation per judge per submission)
        let evaluation = await Evaluation.findOne({ submission, judge: judgeId });
        if(evaluation){
            evaluation.innovationScore = innovationScore;
            evaluation.technicalScore = technicalScore;
            evaluation.uiuxScore = uiuxScore;
            evaluation.presentationScore = presentationScore;
            evaluation.comments = comments;
            await evaluation.save();
        } else {
            evaluation = await Evaluation.create({
                submission,
                judge: judgeId,
                innovationScore,
                technicalScore,
                uiuxScore,
                presentationScore,
                comments
            });
        }
        res.status(201).json({ message: "Evaluation saved successfully", data: evaluation });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getEvaluationsBySubmission = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ submission: req.params.submissionId })
                                            .populate("judge", "firstName lastName email");
        res.status(200).json({ data: evaluations });
    } catch (err) {
        res.status(500).json({ message: "Error fetching evaluations", err });
    }
};

const getEvaluationsByJudge = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ judge: req.user.id })
                                            .populate({
                                                path: 'submission',
                                                populate: { path: 'team hackathon', select: 'name title' }
                                            });
        res.status(200).json({ data: evaluations });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { addEvaluation, getEvaluationsBySubmission, getEvaluationsByJudge };