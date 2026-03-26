const mongoose = require("mongoose");
const Registration = require("../models/RegistrationModel");

const registerForHackathon = async (req, res) => {
    try {
        const { hackathon, team } = req.body;
        const user = req.user.id;

        // ✅ Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(hackathon)) {
            return res.status(400).json({
                message: "Invalid User or Hackathon ID"
            });
        }

        // ✅ Prevent duplicate registration
        const exists = await Registration.findOne({ user, hackathon });
        if (exists) {
            return res.status(400).json({
                message: "Already registered"
            });
        }

        const registration = await Registration.create({
            user,
            hackathon,
            team
        });

        res.status(201).json({
            message: "Registration successful",
            data: registration
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};
const getRegistrationsByHackathon = async (req, res) => {
    try {
        const registrations = await Registration.find({ hackathon: req.params.hackathonId })
            .populate("user", "firstName lastName email")
            .populate("team", "name");
        res.status(200).json({ data: registrations });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateRegistrationStatus = async (req, res) => {
    try {
        const { isApproved, paymentStatus } = req.body;
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { isApproved, paymentStatus },
            { new: true }
        );
        res.status(200).json({ message: "Registration updated", data: registration });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerForHackathon, getRegistrationsByHackathon, updateRegistrationStatus };