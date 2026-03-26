const Team = require("../models/TeamModel");
const TeamMember = require("../models/TeamMemberModel");
const Hackathon = require("../models/HackathonModel");

const createTeam = async (req, res) => {
    try {
        const { name, hackathonId } = req.body;
        const leaderId = req.user.id;

        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) return res.status(404).json({ message: "Hackathon not found" });

        // Check registration dates
        const now = new Date();
        if (hackathon.registrationEnd && new Date(hackathon.registrationEnd) < now) {
            return res.status(400).json({ message: "Registration deadline has passed" });
        }

        // Check if user is already in a team for this hackathon
        const existingMemberships = await TeamMember.find({ user: leaderId }).populate("team");
        const alreadyInTeam = existingMemberships.some(m => m.team && m.team.hackathon.toString() === hackathonId);
        if (alreadyInTeam) {
            return res.status(400).json({ message: "You are already part of a team for this hackathon" });
        }

        // Create Team
        const team = await Team.create({
            name,
            hackathon: hackathonId,
            leader: leaderId
        });

        // Add leader as TeamMember
        await TeamMember.create({
            team: team._id,
            user: leaderId,
            role: "leader"
        });

        res.status(201).json({ message: "Team created", data: team });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTeamsByHackathon = async (req, res) => {
    try {
        const teams = await Team.find({ hackathon: req.params.hackathonId })
                                .populate("leader", "firstName lastName email");
        res.status(200).json({ data: teams });
    } catch (err) {
        res.status(500).json({ message: "Error fetching teams", err });
    }
};

const updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json({ message: "Team updated", data: team });
    } catch (err) {
        res.status(500).json({ message: "Error updating team", err });
    }
};

const deleteTeam = async (req, res) => {
    try {
        // Also delete members
        await TeamMember.deleteMany({ team: req.params.id });
        const team = await Team.findByIdAndDelete(req.params.id);
        if(!team) return res.status(404).json({ message: "Team not found" });
        res.status(200).json({ message: "Team deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting team", err });
    }
};

module.exports = { createTeam, getTeamsByHackathon, updateTeam, deleteTeam };