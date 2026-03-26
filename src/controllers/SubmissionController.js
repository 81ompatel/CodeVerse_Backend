const Submission = require("../models/SubmissionModel");
const TeamMember = require("../models/TeamMemberModel");
const Hackathon = require("../models/HackathonModel");

const submitProject = async (req, res) => {
    try {
        const { hackathon, team, githubLink, fileLink, pptLink } = req.body;
        
        // Ensure user is in the team
        const isMember = await TeamMember.findOne({ team: team, user: req.user.id });
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this team" });
        }

        const hackathonData = await Hackathon.findById(hackathon);
        if (hackathonData.status === "completed") {
            return res.status(400).json({ message: "Hackathon has ended" });
        }

        // Upsert submission
        let submission = await Submission.findOne({ team, hackathon });
        if (submission) {
            submission.githubLink = githubLink || submission.githubLink;
            submission.fileLink = fileLink || submission.fileLink;
            submission.pptLink = pptLink || submission.pptLink;
            await submission.save();
        } else {
            submission = await Submission.create({
                hackathon,
                team,
                githubLink,
                fileLink,
                pptLink
            });
        }
        res.status(201).json({ message: "Submission successful", data: submission });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSubmissionsByHackathon = async (req, res) => {
    try {
        const submissions = await Submission.find({ hackathon: req.params.hackathonId })
                                            .populate("team", "name")
                                            .populate("hackathon", "title");
        res.status(200).json({ data: submissions });
    } catch (err) {
        res.status(500).json({ message: "Error fetching submissions", err });
    }
};

const updateSubmissionStatus = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status },
            { new: true }
        );
        res.status(200).json({ message: "Status updated", data: submission });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { submitProject, getSubmissionsByHackathon, updateSubmissionStatus };