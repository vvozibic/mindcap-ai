// 1) enum типов событий
export enum PointEventType {
  REGISTER = "REGISTER",
  CONNECT_FIRST_WALLET = "CONNECT_FIRST_WALLET",
  REFERRAL_QUALIFIED = "REFERRAL_QUALIFIED",
}

// 2) базовые очки по событиям (до множителя)
export const POINTS: Record<PointEventType, number> = {
  [PointEventType.REGISTER]: 100,
  [PointEventType.CONNECT_FIRST_WALLET]: 100,
  [PointEventType.REFERRAL_QUALIFIED]: 500,
};
