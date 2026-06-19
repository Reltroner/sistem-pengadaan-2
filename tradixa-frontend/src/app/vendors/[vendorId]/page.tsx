import { notFound } from "next/navigation";
import Link from "next/link";
import { getVendorByIdData } from "@/features/procurement-negotiation/services/procurement-data-source.service";
import { SectionCard } from "@/components/data-display/SectionCard";

export default async function VendorDetailPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  const { vendorId } = await params;
  const vendor = await getVendorByIdData(vendorId);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <Link href="/vendors/list" className="text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Back to Vendor List
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold text-gray-900">{vendor.name}</h1>
            <span className="text-sm font-mono text-gray-500">{vendor.vendorCode} • {vendor.legalName}</span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
              vendor.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" :
              vendor.status === "INACTIVE" ? "bg-gray-100 text-gray-800" :
              "bg-red-100 text-red-800"
            }`}>
              {vendor.status}
            </span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
              vendor.riskLevel === "LOW" ? "bg-blue-100 text-blue-800" :
              vendor.riskLevel === "MEDIUM" ? "bg-amber-100 text-amber-800" :
              "bg-red-100 text-red-800"
            }`}>
              Risk Level: {vendor.riskLevel}
            </span>
          </div>
        </div>
        
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-100 pb-2">Contact Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-gray-500 font-medium">Contact Person</span>
                <span className="text-gray-900">{vendor.contactPerson}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Email</span>
                <span className="text-blue-600">{vendor.email}</span>
              </div>
              <div>
                <span className="block text-gray-500 font-medium">Phone Number</span>
                <span className="text-gray-900">{vendor.phone || "-"}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 border-b border-gray-100 pb-2">Address</h3>
            <div className="space-y-4 text-sm">
              <div className="text-gray-900 leading-relaxed">
                {vendor.address?.line1}<br />
                {vendor.address?.line2 && <>{vendor.address.line2}<br /></>}
                {vendor.address?.city}, {vendor.address?.province}<br />
                {vendor.address?.postalCode && <>{vendor.address.postalCode}<br /></>}
                {vendor.address?.country}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SectionCard title="Bank & Tax Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block text-gray-500 font-medium">Tax Number (NPWP)</span>
              <span className="text-gray-900">{vendor.taxNumber || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Bank Name</span>
              <span className="text-gray-900">{vendor.bankName || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Account Name</span>
              <span className="text-gray-900">{vendor.bankAccountName || "-"}</span>
            </div>
            <div>
              <span className="block text-gray-500 font-medium">Account Number</span>
              <span className="text-gray-900">{vendor.bankAccountNumber || "-"}</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Registered At: {new Date(vendor.createdAt).toLocaleDateString()} <br />
              Last Updated: {new Date(vendor.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
