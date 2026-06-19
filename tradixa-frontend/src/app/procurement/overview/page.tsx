import Link from "next/link";
import { getProcurementDashboardSummaryWithLimitedActivities } from "@/features/procurement-negotiation/services";
import { StatCard } from "@/components/data-display/StatCard";
import { SectionCard } from "@/components/data-display/SectionCard";

export default function ProcurementOverviewPage() {
  const summaryData = getProcurementDashboardSummaryWithLimitedActivities(5);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Procurement Dashboard</h1>
          <p className="text-gray-500 mb-8">
            The SPK prototype has been &quot;saved&quot;. This is a frontend prototype only, no data was persisted to the backend.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/spk/create"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create SPK
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total SPK" value={summaryData.totalSpk} accent="blue" />
        <StatCard title="Draft SPK" value={summaryData.draftSpk} accent="slate" />
        <StatCard title="In Negotiation" value={summaryData.inNegotiation} accent="indigo" />
        <StatCard title="Waiting Approval" value={summaryData.waitingManagerApproval} accent="amber" />
        <StatCard title="PO Draft Created" value={summaryData.poDraftCreated} accent="emerald" />
        <StatCard title="High Value Procurement" value={summaryData.highValueProcurement} accent="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SectionCard title="Recent Activities" action={<Link href="/procurement/activities" className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</Link>}>
            <div className="flow-root">
              <ul className="-mb-8">
                {summaryData.recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== summaryData.recentActivities.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                            <span className="text-blue-600 font-semibold text-xs">
                              {activity.actor.name.charAt(0)}
                            </span>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{activity.actor.name}</span>{" "}
                              {activity.title}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400">{activity.description}</p>
                          </div>
                          <div className="text-right text-xs whitespace-nowrap text-gray-500">
                            {new Date(activity.createdAt).toLocaleDateString()}
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

        <div className="lg:col-span-1 space-y-6">
          <SectionCard title="Quick Links">
            <div className="space-y-3">
              <Link href="/spk/list" className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="font-medium text-sm text-gray-900">SPK Intake</div>
                <div className="text-xs text-gray-500 mt-1">Manage all pending and ongoing SPK</div>
              </Link>
              <Link href="/negotiations/list" className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="font-medium text-sm text-gray-900">Negotiations</div>
                <div className="text-xs text-gray-500 mt-1">Compare vendors and select offers</div>
              </Link>
              <Link href="/vendors/list" className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="font-medium text-sm text-gray-900">Vendor Database</div>
                <div className="text-xs text-gray-500 mt-1">Centralized supplier master data</div>
              </Link>
              <Link href="/purchase-orders/draft" className="block p-3 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <div className="font-medium text-sm text-gray-900">PO Drafts</div>
                <div className="text-xs text-gray-500 mt-1">Review drafts before handoff</div>
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
