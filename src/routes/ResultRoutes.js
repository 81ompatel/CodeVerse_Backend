const router = require("express").Router();
const resultController = require("../controllers/ResultController");
const { verifyToken, verifyRole } = require("../middleware/AuthMiddleware");

router.get("/hackathon/:hackathonId", verifyToken, resultController.declareResults);

module.exports = router;
