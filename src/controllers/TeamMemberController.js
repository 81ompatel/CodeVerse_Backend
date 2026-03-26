const TeamMember = require("../models/TeamMemberModel");
const Team = require("../models/TeamModel");
const Hackathon = require("../models/HackathonModel");

const addMember = async (req, res) => {
    try {
        const { teamId, userId } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: "Team not found" });

        const hackathon = await Hackathon.findById(team.hackathon);
        
        // Size validation
        const currentMembersCount = await TeamMember.countDocuments({ team: teamId });
        if (currentMembersCount >= hackathon.maxTeamSize) {
            return res.status(400).json({ message: `Team is full. Max size is ${hackathon.maxTeamSize}` });
        }

        // Duplicate existence validation across hackathon
        const existingMemberships = await TeamMember.find({ user: userId }).populate("team");
        const alreadyInTeam = existingMemberships.some(m => m.team && m.team.hackathon.toString() === hackathon._id.toString());
        if (alreadyInTeam) {
            return res.status(400).json({ message: "User is already part of a team for this hackathon" });
        }

        const member = await TeamMember.create({ team: teamId, user: userId, role: "member" });
        res.status(201).json({ message: "Member added", data: member });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMembersByTeam = async (req, res) => {
    try {
        const members = await TeamMember.find({ team: req.params.teamId })
                                        .populate("user", "firstName lastName email");
        res.status(200).json({ data: members });
    } catch (err) {
        res.status(500).json({ message: "Error fetching members", err });
    }
};

module.exports = { addMember, getMembersByTeam };