const router = require("express").Router();
const registrationController = require("../controllers/RegistrationController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

router.post("/", verifyToken, registrationController.registerForHackathon);
router.get("/hackathon/:hackathonId", verifyToken, registrationController.getRegistrationsByHackathon);
router.put("/:id", verifyToken, verifyRole(["admin", "ADMIN"]), registrationController.updateRegistrationStatus);

module.exports = router;