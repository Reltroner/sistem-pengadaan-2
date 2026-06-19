export function WorkflowStageBadge({ stage }: { stage: string }) {
  return (
    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded border border-gray-200 bg-gray-50 text-gray-600">
      {stage.replace(/_/g, " ")}
    </span>
  );
}
