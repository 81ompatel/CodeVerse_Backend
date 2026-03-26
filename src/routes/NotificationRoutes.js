const router = require("express").Router();
const notificationController = require("../controllers/NotificationController");

router.post("/", notificationController.sendNotification);
router.get("/user/:userId", notificationController.getUserNotifications);
router.put("/read/:id", notificationController.markAsRead);

module.exports = router;