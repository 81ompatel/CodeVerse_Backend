const Evaluation = require("../models/EvaluationModel");
const Hackathon = require("../models/HackathonModel");

const declareResults = async (req, res) => {
    try {
        const { hackathonId } = req.params;

        // 1. Fetch all evaluations for this hackathon
        const evaluations = await Evaluation.find()
            .populate({
                path: 'submission',
                match: { hackathon: hackathonId },
                populate: { path: 'team', select: 'name' }
            });

        // Filter out evaluations where submission doesn't match the hackathon
        const validEvaluations = evaluations.filter(e => e.submission !== null);

        // 2. Aggregate scores by Team
        const teamScores = {};
        
        validEvaluations.forEach(evaluationItem => {
            const teamId = evaluationItem.submission.team._id.toString();
            if (!teamScores[teamId]) {
                teamScores[teamId] = {
                    team: evaluationItem.submission.team,
                    totalScore: 0,
                    evaluationCount: 0
                };
            }
            teamScores[teamId].totalScore += evaluationItem.totalScore;
            teamScores[teamId].evaluationCount += 1;
        });

        // 3. Calculate average score and sort
        const results = Object.values(teamScores).map(ts => ({
            team: ts.team,
            averageScore: Number((ts.totalScore / ts.evaluationCount).toFixed(2))
        })).sort((a, b) => b.averageScore - a.averageScore);

        // Update Hackathon status
        await Hackathon.findByIdAndUpdate(hackathonId, { status: "completed" });

        res.status(200).json({ message: "Results calculated successfully", data: results });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { declareResults };
