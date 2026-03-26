const router = require("express").Router();
const teamController = require("../controllers/TeamController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, teamController.createTeam);
router.get("/hackathon/:hackathonId", verifyToken, teamController.getTeamsByHackathon);
router.put("/:id", verifyToken, teamController.updateTeam);
router.delete("/:id", verifyToken, teamController.deleteTeam);

module.exports = router;