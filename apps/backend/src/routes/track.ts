import { Router } from "express";
import { sendAnalyticsEvent } from "../analytics";

const router = Router();

router.post("/", (req, res) => {
  const { event, props, userId } = req.body;
  const sid = req.cookies.sid; // ✅ берём sessionId из куки
  const distinctId = userId || sid || "anon";

  sendAnalyticsEvent(event, { ...props }, distinctId);
  res.json({ success: true });
});

export default router;
