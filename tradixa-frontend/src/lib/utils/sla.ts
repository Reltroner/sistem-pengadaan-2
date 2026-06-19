export type SlaStatus = "ON_TRACK" | "DUE_SOON" | "OVERDUE";

export function getSlaStatus(deadline: string | Date, now: string | Date = new Date()): SlaStatus {
  const deadlineTime = new Date(deadline).getTime();
  const nowTime = new Date(now).getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  if (nowTime > deadlineTime) {
    return "OVERDUE";
  }

  if (deadlineTime - nowTime <= oneDayMs) {
    return "DUE_SOON";
  }

  return "ON_TRACK";
}
