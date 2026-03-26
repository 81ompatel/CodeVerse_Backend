const ProblemStatement = require("../models/ProblemModel");

const addProblem = async (req, res) => {
    try {
        if (!req.body.hackathon) {
            return res.status(400).json({
                message: "Hackathon ID required"
            });
        }

        const problem = await ProblemStatement.create({
            title: req.body.title,
            description: req.body.description,
            pdfLink: req.body.pdfLink,
            githubTemplate: req.body.githubTemplate,
            isActive: req.body.isActive !== undefined ? req.body.isActive : true,
            hackathon: req.body.hackathon
        });

        res.status(201).json({
            message: "Problem added",
            data: problem
        });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
};

const getProblemsByHackathon = async (req, res) => {
    try {
        const problems = await ProblemStatement.find({
            hackathon: req.params.hackathonId
        });

        res.status(200).json({ data: problems });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProblem = async (req, res) => {
    try {
        const problem = await ProblemStatement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ data: problem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProblem = async (req, res) => {
    try {
        await ProblemStatement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Problem deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addProblem, getProblemsByHackathon, updateProblem, deleteProblem };