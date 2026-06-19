import { notFound } from "next/navigation";
import { getSPKById } from "@/features/procurement-negotiation/services";
import { SPKSummaryCard } from "@/features/procurement-negotiation/components/SPKSummaryCard";
import { SectionCard } from "@/components/data-display/SectionCard";
import Link from "next/link";

export default async function SPKDetailPage({
  params,
}: {
  params: Promise<{ spkId: string }>;
}) {
  const { spkId } = await params;
  const spk = getSPKById(spkId);

  if (!spk) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/spk/list" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Back to List
        </Link>
      </div>

      <SPKSummaryCard spk={spk} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Procurement Workflow Status">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-700">Next Action Required</span>
                <span className="text-sm text-gray-500">By {spk.workflow.ownerRole}</span>
              </div>
              <div className="text-lg font-bold text-gray-900">{spk.workflow.nextActionLabel}</div>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
                  Execute Action (Prototype)
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Notes & Additional Info">
            {spk.notes ? (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{spk.notes}</p>
            ) : (
              <p className="text-sm text-gray-400 italic">No notes provided.</p>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Related Documents">
            <ul className="space-y-3">
              {spk.documents.map((doc) => (
                <li key={doc.id} className="flex items-start gap-3 p-3 rounded bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors cursor-pointer">
                  <div className="mt-0.5 text-blue-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">{doc.fileName}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{doc.type} • {new Date(doc.uploadedAt).toLocaleDateString()}</div>
                  </div>
                </li>
              ))}
              {spk.documents.length === 0 && (
                <li className="text-sm text-gray-400 italic">No documents attached.</li>
              )}
            </ul>
          </SectionCard>

          <SectionCard title="Quick Links">
            <div className="space-y-2">
              <Link href={`/negotiations/list`} className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
                View Negotiations
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
