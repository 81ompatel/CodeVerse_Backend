const Hackathon = require("../models/HackathonModel");

// Create Hackathon
const createHackathon = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const hackathon = await Hackathon.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Hackathon created successfully",
            data: hackathon
        });

    } catch (err) {
        console.log("ERROR:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get All Hackathons
const getAllHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find();

        res.status(200).json({
            success: true,
            data: hackathons
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Get Hackathon By ID
const getHackathonById = async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);

        if (!hackathon)
            return res.status(404).json({ message: "Hackathon not found" });

        res.status(200).json({
            success: true,
            data: hackathon
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update Hackathon
const updateHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: hackathon
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete Hackathon
const deleteHackathon = async (req, res) => {
    try {
        await Hackathon.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Hackathon deleted"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    createHackathon,
    getAllHackathons,
    getHackathonById,
    updateHackathon,
    deleteHackathon
};