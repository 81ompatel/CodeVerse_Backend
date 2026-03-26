const router = require("express").Router();
const certificateController = require("../controllers/CertificateController");

router.post("/", certificateController.generateCertificate);
router.get("/user/:userId", certificateController.getCertificatesByUser);

module.exports = router;