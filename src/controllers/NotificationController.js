const Notification = require("../models/NotificationModel");

// Send a notification
const sendNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        // Optional: send email if type is email (using your MailUtil)
        if(req.body.type === "email"){
            const mailSend = require("../utils/MailUtil");
            await mailSend(req.body.userEmail, req.body.title, req.body.message);
        }
        res.status(201).json({ message: "Notification sent", data: notification });
    } catch (err) {
        res.status(500).json({ message: "Error sending notification", err });
    }
};

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json({ data: notifications });
    } catch (err) {
        res.status(500).json({ message: "Error fetching notifications", err });
    }
};

// Mark notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
        res.status(200).json({ message: "Notification marked as read", data: notification });
    } catch (err) {
        res.status(500).json({ message: "Error updating notification", err });
    }
};

module.exports = { sendNotification, getUserNotifications, markAsRead };