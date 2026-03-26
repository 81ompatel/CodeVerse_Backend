const router = require("express").Router();
const problemController = require("../controllers/ProblemController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

console.log("Problem Controller:", problemController);

router.post("/", verifyToken, verifyRole(["admin", "ADMIN"]), problemController.addProblem);
router.get("/hackathon/:hackathonId", problemController.getProblemsByHackathon);
router.put("/:id", verifyToken, verifyRole(["admin", "ADMIN"]), problemController.updateProblem);
router.delete("/:id", verifyToken, verifyRole(["admin", "ADMIN"]), problemController.deleteProblem);

module.exports = router;