const router = require("express").Router();
const hackathonController = require("../controllers/HackathonController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, verifyRole(["admin", "ADMIN"]), hackathonController.createHackathon);
router.get("/", hackathonController.getAllHackathons);
router.get("/:id", hackathonController.getHackathonById);
router.put("/:id", verifyToken, verifyRole(["admin", "ADMIN"]), hackathonController.updateHackathon);
router.delete("/:id", verifyToken, verifyRole(["admin", "ADMIN"]), hackathonController.deleteHackathon);

module.exports = router;