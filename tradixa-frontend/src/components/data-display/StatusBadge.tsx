import { SPKRecordStatus } from "@/features/procurement-negotiation/types/spk.types";

export function StatusBadge({ status }: { status: SPKRecordStatus | string }) {
  let bg = "bg-gray-100";
  let text = "text-gray-700";

  if (status.includes("DRAFT") || status === "SPK_DRAFT") {
    bg = "bg-slate-100";
    text = "text-slate-700";
  } else if (status.includes("SUBMITTED")) {
    bg = "bg-blue-100";
    text = "text-blue-700";
  } else if (status.includes("OPEN") || status.includes("COLLECTED")) {
    bg = "bg-indigo-100";
    text = "text-indigo-700";
  } else if (status.includes("SELECTED") || status.includes("APPROVAL")) {
    bg = "bg-amber-100";
    text = "text-amber-700";
  } else if (status === "APPROVED" || status.includes("CREATED") || status.includes("HANDOFF")) {
    bg = "bg-emerald-100";
    text = "text-emerald-700";
  } else if (status === "REJECTED" || status.includes("CANCELLED")) {
    bg = "bg-red-100";
    text = "text-red-700";
  } else if (status.includes("REVISION")) {
    bg = "bg-orange-100";
    text = "text-orange-700";
  }

  const formattedStatus = status.replace(/_/g, " ");

  return (
    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bg} ${text}`}>
      {formattedStatus}
    </span>
  );
}
