const Certificate = require("../models/CertificateModel");

const generateCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.create(req.body);
        res.status(201).json({ message: "Certificate generated", data: certificate });
    } catch (err) {
        res.status(500).json({ message: "Error generating certificate", err });
    }
};

const getCertificatesByUser = async (req, res) => {
    try {
        const certificates = await Certificate.find({ user: req.params.userId })
                                              .populate("hackathon", "title")
                                              .populate("team", "name");
        res.status(200).json({ data: certificates });
    } catch (err) {
        res.status(500).json({ message: "Error fetching certificates", err });
    }
};

module.exports = { generateCertificate, getCertificatesByUser };