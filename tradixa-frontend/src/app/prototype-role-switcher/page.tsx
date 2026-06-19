import { RoleSwitcher } from "@/components/RoleSwitcher";

export default function PrototypeRoleSwitcherPage() {
  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Prototype Configuration</h1>
        <p className="text-gray-500">
          This page allows you to switch the perspective of the application based on user roles.
        </p>
      </div>
      <RoleSwitcher />
    </div>
  );
}
