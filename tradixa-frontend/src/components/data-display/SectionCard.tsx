import React from "react";

export function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}
