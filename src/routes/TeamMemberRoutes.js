const router = require("express").Router();
const teamMemberController = require("../controllers/TeamMemberController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, teamMemberController.addMember);
router.get("/team/:teamId", verifyToken, teamMemberController.getMembersByTeam);

module.exports = router;