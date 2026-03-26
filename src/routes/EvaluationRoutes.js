const router = require("express").Router();
const evaluationController = require("../controllers/EvaluationController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, verifyRole(["judge", "JUDGE", "admin", "ADMIN"]), evaluationController.addEvaluation);
router.get("/submission/:submissionId", verifyToken, evaluationController.getEvaluationsBySubmission);
router.get("/my-evaluations", verifyToken, verifyRole(["judge", "JUDGE"]), evaluationController.getEvaluationsByJudge);

module.exports = router;