// backend/utils/analytics.server.ts
import Mixpanel from "mixpanel";
import { AnalyticsEvent, EventPropsMap } from "./types";

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN!);

export function sendAnalyticsEvent<K extends AnalyticsEvent>(
  event: K,
  props: EventPropsMap[K],
  userId?: string
) {
  const meta = {
    ...props,
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  };

  // обычный трек
  mixpanel.track(event, { distinct_id: userId ?? "server", ...meta });

  // если передали специальный признак — обновляем people-профиль
  if (userId && (props as any)._identifyTraits) {
    mixpanel.people.set(userId, (props as any)._identifyTraits);
  }
}
