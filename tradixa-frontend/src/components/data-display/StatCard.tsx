export function StatCard({
  title,
  value,
  subtitle,
  accent = "blue",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: "blue" | "emerald" | "amber" | "indigo" | "red" | "slate";
}) {
  const accentClasses = {
    blue: "border-blue-500",
    emerald: "border-emerald-500",
    amber: "border-amber-500",
    indigo: "border-indigo-500",
    red: "border-red-500",
    slate: "border-slate-500",
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 border-t-4 ${accentClasses[accent]}`}>
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-2 text-3xl font-semibold text-gray-900">{value}</dd>
      {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}
