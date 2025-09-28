import React from "react";
import { Shield, Stethoscope } from "lucide-react";

// Define the type for the roles to match the rest of your app
type UserRole = "Admin" | "Doctor" | "Nurse";

// Update the props interface to use the new type
interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Select Your Role
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          // Pass back the capitalized string 'Admin'
          onClick={() => onRoleChange("Admin")}
          className={`
            relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all
            ${
              selectedRole === "Admin"
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-lg"
                : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
            }
          `}
        >
          <Shield className="w-7 h-7 mb-2" />
          <span className="text-sm font-semibold">Admin</span>
          {selectedRole === "Admin" && (
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          )}
        </button>

        <button
          type="button"
          // Pass back the capitalized string 'Doctor'
          onClick={() => onRoleChange("Doctor")}
          className={`
            relative flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all
            ${
              selectedRole === "Doctor"
                ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg"
                : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
            }
          `}
        >
          <Stethoscope className="w-7 h-7 mb-2" />
          <span className="text-sm font-semibold">Doctor</span>
          {selectedRole === "Doctor" && (
            <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
