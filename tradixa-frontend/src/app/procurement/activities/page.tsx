import { getRecentProcurementActivities } from "@/features/procurement-negotiation/services";
import { SectionCard } from "@/components/data-display/SectionCard";

export default function ProcurementActivitiesPage() {
  const activities = getRecentProcurementActivities(50); // Get more for the dedicated page

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Procurement Activities</h1>
        <p className="mt-1 text-sm text-gray-500">
          A comprehensive timeline of all actions taken in the M1 module.
        </p>
      </div>

      <SectionCard title="Activity Log">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center ring-8 ring-white">
                        <span className="text-slate-600 font-semibold text-xs">
                          {activity.actor.name.charAt(0)}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{activity.actor.name}</span>{" "}
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                            {activity.title}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-right text-xs whitespace-nowrap text-gray-500">
                        {new Date(activity.createdAt).toLocaleString()}
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
  );
}
