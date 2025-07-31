// backend/routes/track.ts
import { Router } from "express";
import { sendAnalyticsEvent } from "../analytics";
import { AnalyticsEvent } from "../analytics/types";

const router = Router();

router.post("/", (req, res) => {
  const { event, props, userId } = req.body as {
    event: AnalyticsEvent;
    props: any;
    userId?: string;
  };

  if (!event) return res.status(400).json({ error: "Event name required" });

  sendAnalyticsEvent(event, props, userId);
  res.json({ success: true });
});

export default router;
