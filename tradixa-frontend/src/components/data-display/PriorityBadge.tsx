import { ProcurementPriority } from "@/features/procurement-negotiation/types/procurement-common.types";

export function PriorityBadge({ priority }: { priority: ProcurementPriority }) {
  let bg = "bg-gray-100";
  let text = "text-gray-700";

  switch (priority) {
    case "LOW":
      bg = "bg-slate-100";
      text = "text-slate-600";
      break;
    case "NORMAL":
      bg = "bg-blue-100";
      text = "text-blue-700";
      break;
    case "HIGH":
      bg = "bg-orange-100";
      text = "text-orange-700";
      break;
    case "URGENT":
      bg = "bg-red-100";
      text = "text-red-700";
      break;
  }

  return (
    <span className={`px-2 py-0.5 inline-flex text-xs font-semibold rounded ${bg} ${text}`}>
      {priority}
    </span>
  );
}
