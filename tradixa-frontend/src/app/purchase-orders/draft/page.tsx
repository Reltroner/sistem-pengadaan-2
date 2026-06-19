import { mockPODrafts } from "@/features/procurement-negotiation/mock";
import { getVendorById, getSPKById } from "@/features/procurement-negotiation/services";
import { SectionCard } from "@/components/data-display/SectionCard";
import { formatCurrencyIDR } from "@/lib/utils/currency";

export default function PODraftsPage() {
  const drafts = mockPODrafts;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase Order Drafts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review PO drafts before they are handed off to the vendor execution module.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Draft Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related SPK</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tax (11%)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {drafts.map((draft) => {
                const vendor = getVendorById(draft.selectedVendorId);
                const spk = getSPKById(draft.spkId);
                return (
                  <tr key={draft.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{draft.poDraftNumber}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">{draft.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {spk?.spkNumber || draft.spkId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{vendor?.name || draft.selectedVendorId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                      {formatCurrencyIDR(draft.subtotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {formatCurrencyIDR(draft.taxAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-indigo-700">
                      {formatCurrencyIDR(draft.grandTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {draft.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {drafts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                    No PO drafts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold text-gray-900 px-1">Detailed View Preview</h2>
        {drafts.length > 0 && (
          <SectionCard title={`Draft Details: ${drafts[0].poDraftNumber}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Procurement Items</h4>
                <ul className="space-y-3 divide-y divide-gray-100">
                  {drafts[0].procurementItems.map((item, idx) => (
                    <li key={item.id || idx} className="pt-2 first:pt-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">Qty: {item.quantity} {item.unit}</div>
                        </div>
                        {item.estimatedTotalPrice && (
                          <div className="text-sm text-gray-600 font-medium">
                            {formatCurrencyIDR(item.estimatedTotalPrice)}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Financial Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrencyIDR(drafts[0].subtotal)}</span>
                  </div>
                  {drafts[0].discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount</span>
                      <span>-{formatCurrencyIDR(drafts[0].discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600 pb-3 border-b border-gray-100">
                    <span>Tax (11%)</span>
                    <span>{formatCurrencyIDR(drafts[0].taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span>{formatCurrencyIDR(drafts[0].grandTotal)}</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    Edit Draft
                  </button>
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Handoff to Vendor Module
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
