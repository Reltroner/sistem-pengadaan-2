import { SPKRecord } from "@/features/procurement-negotiation/types";
import { PriorityBadge } from "@/components/data-display/PriorityBadge";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { WorkflowStageBadge } from "@/components/workflow/WorkflowStageBadge";

export function SPKSummaryCard({ spk }: { spk: SPKRecord }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-900">{spk.spkNumber}</h3>
          <StatusBadge status={spk.status} />
        </div>
        <PriorityBadge priority={spk.priority} />
      </div>
      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Title</div>
          <div className="text-base font-semibold text-gray-900">{spk.title}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Project</div>
          <div className="text-sm text-gray-900">{spk.projectName}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Customer</div>
          <div className="text-sm text-gray-900">{spk.customerName}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Owner</div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
              {spk.owner.name.charAt(0)}
            </div>
            <span className="text-sm text-gray-900">{spk.owner.name}</span>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Workflow Stage</div>
          <WorkflowStageBadge stage={spk.workflow.stage} />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">Requested By</div>
          <div className="text-sm text-gray-900">{spk.requestedBy}</div>
        </div>
      </div>
    </div>
  );
}
