import { notFound } from "next/navigation";
import Link from "next/link";
import { mockPriceComparisonMatrices } from "@/features/procurement-negotiation/mock";
import { VendorComparisonTable } from "@/components/workflow/VendorComparisonTable";
import { getSPKById } from "@/features/procurement-negotiation/services";
import { mockNegotiationSessions } from "@/features/procurement-negotiation/mock";

export default async function VendorComparisonPage({
  params,
}: {
  params: Promise<{ negotiationId: string }>;
}) {
  const { negotiationId } = await params;
  const matrix = mockPriceComparisonMatrices.find((m) => m.negotiationId === negotiationId);
  const negotiation = mockNegotiationSessions.find((n) => n.id === negotiationId);

  if (!matrix || !negotiation) {
    notFound();
  }

  const spk = getSPKById(negotiation.spkId);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 mb-2">
        <div>
          <Link href={`/negotiations/${negotiationId}`} className="text-sm font-medium text-gray-500 hover:text-gray-900">
            ← Back to Negotiation Detail
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Comparison Matrix</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed scoring and rank for {spk?.title || negotiation.spkId}
          </p>
        </div>
      </div>

      <VendorComparisonTable matrix={matrix} />

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 mb-2">Scoring Criteria Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-gray-600">
          <div><strong className="text-gray-800">Price (P):</strong> Competitiveness of grand total vs target budget.</div>
          <div><strong className="text-gray-800">Delivery (D):</strong> Lead time commitment vs project schedule.</div>
          <div><strong className="text-gray-800">Risk (R):</strong> Vendor track record and financial stability.</div>
          <div><strong className="text-gray-800">Compliance (C):</strong> Adherence to technical requirements.</div>
        </div>
      </div>
    </div>
  );
}
