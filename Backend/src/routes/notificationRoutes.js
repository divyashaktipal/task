import express from "express";
import { testNotification } from "../controllers/notificationController.js";
import Notification from "../models/notification.js";
import { addListener, removeListener, pushNotification } from "../services/notification.js";

const router = express.Router();

// fetch all saved notif
router.get("/", async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});
// listen for new notifi
router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  addListener(res);

  req.on("close", () => removeListener(res));
});
// push new notifi
router.post("/push", async (req, res) => {
  const notification = await Notification.create({
    message: req.body.message,
  });

  pushNotification(notification);

  res.json({ success: true });
});

// router.get("/stream", connectSSE);
// router.post("/test", testNotification);

export default router;
