class NotificationsController {
    constructor() {
        this.notifications = [];
        this.currentId = 1;
    }

    fetchNotifications(req, res) {
        res.json(this.notifications);
    }

    createNotification(req, res) {
        const { title, message } = req.body;
        const newNotification = {
            id: this.currentId++,
            title,
            message,
            timestamp: new Date()
        };
        this.notifications.push(newNotification);
        res.status(201).json(newNotification);
    }
}

export default NotificationsController;