import Link from "next/link";
import { getVendorsData } from "@/features/procurement-negotiation/services/procurement-data-source.service";

export default async function VendorsListPage() {
  const vendors = await getVendorsData();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Database</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage centralized supplier master data.
          </p>
        </div>
        <div className="w-full md:w-72">
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{vendor.name}</div>
                    <div className="text-xs text-gray-500 font-mono mt-0.5">{vendor.vendorCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        vendor.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" :
                        vendor.status === "INACTIVE" ? "bg-gray-100 text-gray-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {vendor.status}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        vendor.riskLevel === "LOW" ? "bg-blue-100 text-blue-800" :
                        vendor.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        Risk: {vendor.riskLevel}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{vendor.contactPerson}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{vendor.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{vendor.address?.city || "-"}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{vendor.address?.province || "-"}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/vendors/${vendor.id}`} className="text-blue-600 hover:text-blue-900">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
              {vendors.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                    No vendors found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
