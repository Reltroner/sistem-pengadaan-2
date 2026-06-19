import { PriceComparisonMatrix } from "@/features/procurement-negotiation/types";
import { formatCurrencyIDR } from "@/lib/utils/currency";

export function VendorComparisonTable({ matrix }: { matrix: PriceComparisonMatrix }) {
  // Sort by rank ascending
  const sortedResults = [...matrix.results].sort((a, b) => a.rank - b.rank);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Time</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedResults.map((result) => {
            const isRec = result.isRecommended;
            return (
              <tr key={result.id} className={`${isRec ? "bg-blue-50/50" : "hover:bg-gray-50"} transition-colors`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    result.rank === 1 ? "bg-amber-100 text-amber-700" :
                    result.rank === 2 ? "bg-slate-200 text-slate-700" :
                    result.rank === 3 ? "bg-orange-100 text-orange-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    #{result.rank}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{result.vendorName}</div>
                  <div className="text-xs text-gray-500 mt-1 font-mono">Offer: {result.vendorOfferId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{formatCurrencyIDR(result.grandTotal)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                  {result.leadTimeDays} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    result.riskLevel === "LOW" ? "bg-emerald-100 text-emerald-800" :
                    result.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {result.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm font-bold text-indigo-700">{result.score.totalScore}/100</div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    P:{result.score.priceScore} D:{result.score.deliveryScore} R:{result.score.riskScore}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {isRec ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Recommended
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
