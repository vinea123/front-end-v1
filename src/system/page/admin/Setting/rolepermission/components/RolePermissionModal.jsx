import { toast } from "react-toastify";

export default function RolePermissionModal({
  showForm,
  onClose,
  formData,
  setFormData,
  errors,
  setErrors,
  editId,
  roles,
  permissions,
  onSubmit,
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <button
          onClick={onClose}
          className="float-right text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl mb-5 text-cyan-800">
          {editId !== null ? "Update Role-Permission" : "Create Role-Permission"}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={formData.roles_id}
            onChange={(e) =>
              setFormData({ ...formData, roles_id: e.target.value })
            }
            className="w-full border px-3 py-2 rounded text-sm"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {errors.roles_id && (
            <p className="text-red-500 text-xs mt-1">{errors.roles_id}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Permission</label>
          <select
            value={formData.permission_id}
            onChange={(e) =>
              setFormData({ ...formData, permission_id: e.target.value })
            }
            className="w-full border px-3 py-2 rounded text-sm"
          >
            <option value="">Select Permission</option>
            {permissions.map((perm) => (
              <option key={perm.id} value={perm.id}>
                {perm.name || perm.permission || perm.title}
              </option>
            ))}
          </select>
          {errors.permission_id && (
            <p className="text-red-500 text-xs mt-1">{errors.permission_id}</p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onSubmit}
            className="bg-cyan-800 text-white text-sm px-4 py-2 rounded hover:bg-cyan-700"
          >
            {editId !== null ? "Update" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}