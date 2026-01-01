const express = require("express");
const NotificationsController = require("../controllers/notifications");

const router = express.Router();
const notificationsController = new NotificationsController();

router.get(
  "/notifications",
  notificationsController.fetchNotifications.bind(notificationsController)
);
router.post(
  "/notifications",
  notificationsController.createNotification.bind(notificationsController)
);

module.exports = router;
