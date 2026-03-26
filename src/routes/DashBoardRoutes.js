const router = require("express").Router();
const { getDashboard } = require("../controllers/DashBoradController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.get("/", verifyToken, getDashboard);

module.exports = router;