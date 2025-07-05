import { Edit, Trash2 } from "lucide-react";

export default function RolePermissionTable({
  currentData,
  startIndex,
  getRoleName,
  getPermissionName,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs  border border-cyan-800 rounded overflow-hidden">
        <thead className="bg-cyan-800 text-white">
          <tr>
            <th className="px-3 py-2 text-left">No</th>
            <th className="px-3 py-2 text-left">Role</th>
            <th className="px-3 py-2 text-left">Permission</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length ? (
            currentData.map((rp, i) => (
              <tr key={rp.id} className="hover:bg-cyan-50 border-b">
                <td className="px-3 py-2">{startIndex + i + 1}</td>
                <td className="px-3 py-2">{getRoleName(rp.roles_id)}</td>
                <td className="px-3 py-2">{getPermissionName(rp.permission_id)}</td>
                <td className="px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEdit(rp)}
                    className="text-cyan-800 hover:text-cyan-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(rp.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                No matching records
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}