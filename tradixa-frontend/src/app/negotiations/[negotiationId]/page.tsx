import { notFound } from "next/navigation";
import Link from "next/link";
import { getNegotiationByIdData, getSPKByIdData, getNegotiationNotesData } from "@/features/procurement-negotiation/services/procurement-data-source.service";
import { StatusBadge } from "@/components/data-display/StatusBadge";
import { SectionCard } from "@/components/data-display/SectionCard";
import { formatCurrencyIDR } from "@/lib/utils/currency";

export default async function NegotiationDetailPage({
  params,
}: {
  params: Promise<{ negotiationId: string }>;
}) {
  const { negotiationId } = await params;
  const negotiation = await getNegotiationByIdData(negotiationId);

  if (!negotiation) {
    notFound();
  }

  const spk = await getSPKByIdData(negotiation.spkId);
  const notes = await getNegotiationNotesData(negotiationId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/negotiations/list" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Back to List
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-gray-900">Negotiation: {spk?.title || negotiation.spkId}</h1>
            <span className="text-sm font-mono text-gray-500">{negotiation.id}</span>
          </div>
          <StatusBadge status={negotiation.status} />
        </div>
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Target Budget</div>
            <div className="text-lg font-semibold text-gray-900">{negotiation.targetBudget ? formatCurrencyIDR(negotiation.targetBudget) : "-"}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Opened By</div>
            <div className="text-sm text-gray-900">{negotiation.openedBy.name}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">Opened At</div>
            <div className="text-sm text-gray-900">{new Date(negotiation.openedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Selected Vendor Decision" description="Final decision from negotiation process">
            {negotiation.selectedVendorOfferId ? (
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-emerald-800">Vendor Offer Selected</span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-200 text-emerald-800 rounded">
                    {negotiation.decisionReason}
                  </span>
                </div>
                <p className="text-sm text-emerald-700 mt-2">{negotiation.decisionNote}</p>
                <div className="mt-4 pt-3 border-t border-emerald-200">
                  <span className="text-xs font-mono text-emerald-600">Ref: {negotiation.selectedVendorOfferId}</span>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-sm text-gray-500">No vendor selected yet.</p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Negotiation Notes & Timeline">
            <div className="flow-root">
              <ul className="-mb-8">
                {notes.map((note, noteIdx) => (
                  <li key={note.id}>
                    <div className="relative pb-8">
                      {noteIdx !== notes.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                            <span className="text-blue-700 font-semibold text-xs">
                              {note.author.name.charAt(0)}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900 font-medium">
                              {note.author.name}
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                {note.visibility}
                              </span>
                            </p>
                            <p className="mt-1 text-sm text-gray-600">{note.content}</p>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-gray-500">
                            {new Date(note.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Vendor Comparison">
            <p className="text-sm text-gray-500 mb-4">
              Compare all submitted vendor offers across price, lead time, and risk criteria.
            </p>
            <Link
              href={`/negotiations/${negotiationId}/comparison`}
              className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Open Comparison Matrix
            </Link>
          </SectionCard>

          <SectionCard title="Actions">
            <div className="space-y-3">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Add Negotiation Note
              </button>
              {!negotiation.selectedVendorOfferId && (
                <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Select Vendor & Submit
                </button>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
