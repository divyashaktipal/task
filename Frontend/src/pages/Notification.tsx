import { useEffect, useState } from "react";
import axios from "axios";
import { BlurInText } from "../components/ui/blur-in-text";
import { Card } from "@/components/ui/card";
interface Notification {
  _id: string;
  message: string;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  /* FETCH existing notifications */
  useEffect(() => {
    const fetchExistingNotif = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/notifications");
        setNotifications(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExistingNotif();
  }, []);

  /* LISTEN for new notifications */
  useEffect(() => {
    const es = new EventSource(
      "http://localhost:8000/api/notifications/stream"
    );

    es.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
    };

    return () => es.close();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <BlurInText text="This is Notification Page!" />
      <p className="mt-4 text-lg font-semibold text-gray-700 mb-4 ">
        This is the content of the Notification page. Lorem ipsum, dolor sit
        amet consectetur adipisicing elit. Voluptatem, officia! Id possimus
        eligendi eveniet cumque corporis veniam amet vel, mollitia natus ex a
        architecto fugit consequatur saepe tempora voluptate reiciendis.
      </p>
      <Card>
        {notifications.map((n) => (
          <Card className="ml-5 mr-5">
            <div className="ml-5" key={n._id}>
              {n.message}
            </div>
          </Card>
        ))}
      </Card>
    </div>
  );
}

export default Notifications;
