import Link from "next/link";
import { getSPKRecords } from "@/features/procurement-negotiation/services";
import { PriorityBadge } from "@/components/data-display/PriorityBadge";

export default function ProcurementPipelinePage() {
  const allSpks = getSPKRecords();

  const stages = [
    { id: "INTAKE", label: "Intake & Preparation" },
    { id: "NEGOTIATION", label: "Vendor Negotiation" },
    { id: "REVIEW", label: "Manager Review" },
    { id: "EXECUTION", label: "PO Execution" },
    { id: "COMPLETE", label: "Done" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-gray-900">Procurement Pipeline</h1>
        <p className="mt-1 text-sm text-gray-500">Board view of all ongoing procurements across stages.</p>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full gap-6 px-1 min-w-max">
          {stages.map((stage) => {
            const stageSpks = allSpks.filter((spk) => spk.workflow.stage === stage.id);
            return (
              <div key={stage.id} className="w-80 flex flex-col bg-gray-100 rounded-xl max-h-full">
                <div className="p-4 flex items-center justify-between shrink-0">
                  <h3 className="font-semibold text-gray-700 text-sm">{stage.label}</h3>
                  <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {stageSpks.length}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                  {stageSpks.map((spk) => (
                    <Link
                      key={spk.id}
                      href={`/spk/${spk.id}`}
                      className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-mono text-gray-500">{spk.spkNumber}</span>
                        <PriorityBadge priority={spk.priority} />
                      </div>
                      <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {spk.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-3 truncate">{spk.customerName}</p>
                      
                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                            {spk.owner.name.charAt(0)}
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium truncate w-20">
                            {spk.owner.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                          {new Date(spk.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))}
                  {stageSpks.length === 0 && (
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                      <p className="text-xs text-gray-400">No items</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
