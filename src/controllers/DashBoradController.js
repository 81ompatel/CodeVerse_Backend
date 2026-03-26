const Hackathon = require("../models/HackathonModel");
const Registration = require("../models/RegistrationModel");
const Team = require("../models/TeamModel");
const Submission = require("../models/SubmissionModel");
// const Payment = require("../models/PaymentModel"); // Uncomment when you create payment model

// Main dashboard controller
const getDashboard = async (req, res) => {
    try {
        const user = req.user;

        // Admin Dashboard
        if(user.role === "admin" || user.role === "ADMIN") {
            const totalHackathons = await Hackathon.countDocuments();
            const totalRegistrations = await Registration.countDocuments();
            const activeTeams = await Team.countDocuments({ status: "active" });
            const totalSubmissions = await Submission.countDocuments();

            // Temporary revenue
            const revenue = 0;

            return res.status(200).json({
                role: "admin",
                totalHackathons,
                totalRegistrations,
                activeTeams,
                totalSubmissions,
                revenue
            });
        }

        // Judge Dashboard
        if(user.role === "judge" || user.role === "JUDGE") {
            const assignedHackathons = await Hackathon.find(); // MVP: show all
            const pendingEvaluations = await Submission.countDocuments({ status: { $ne: "reviewed" } });

            return res.status(200).json({
                role: "judge",
                assignedHackathons: assignedHackathons.length,
                pendingEvaluations
            });
        }

        // Participant Dashboard
        if(user.role === "participant" || user.role === "USER" || user.role === "PARTICIPANT") {
            const teams = await Team.find({ leader: user.id });
            const submissions = await Submission.find({ team: { $in: teams.map(t => t._id) } });
            const upcomingHackathons = await Hackathon.find({ registrationEnd: { $gte: new Date() } });

            return res.status(200).json({
                role: "participant",
                myTeams: teams.length,
                mySubmissions: submissions.length,
                upcomingHackathons: upcomingHackathons.length
            });
        }

        return res.status(403).json({ message: "Role not recognized" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching dashboard data", err });
    }
};

module.exports = { getDashboard };