const router = require("express").Router();
const submissionController = require("../controllers/SubmissionController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, submissionController.submitProject);
router.get("/hackathon/:hackathonId", verifyToken, submissionController.getSubmissionsByHackathon);
router.put("/:id/status", verifyToken, verifyRole(["admin", "ADMIN", "judge", "JUDGE"]), submissionController.updateSubmissionStatus);

module.exports = router;