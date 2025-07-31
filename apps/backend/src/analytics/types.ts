export enum AnalyticsEvent {
  PAGE_VIEW = "page_view",
  PROJECT_VIEW = "project_view",
  KOL_CLICK = "kol_click",
  USER_ADD_WALLET = "user_add_wallet",
  USER_CREATED = "user_created",
  USER_LOGGED_IN = "user_logged_in",
}

export interface EventPropsMap {
  [AnalyticsEvent.PAGE_VIEW]: { path: string };
  [AnalyticsEvent.PROJECT_VIEW]: { projectId: string };
  [AnalyticsEvent.KOL_CLICK]: { kolId: string; projectId: string };
  [AnalyticsEvent.USER_CREATED]: { userId: string; username: string };
  [AnalyticsEvent.USER_ADD_WALLET]: { username: string; wallet: string };
  [AnalyticsEvent.USER_LOGGED_IN]: { userId: string; method: string };
}
