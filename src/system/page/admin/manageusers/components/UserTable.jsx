import PropTypes from "prop-types";
import { Edit, Trash2 } from "lucide-react";

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  genders: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

function UserTable({ users, startIndex, genders, roles, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs border border-cyan-800 rounded overflow-hidden">
        <thead className="bg-cyan-800 text-white">
          <tr>
            <th className="text-left px-3 py-2">No</th>
            <th className="text-left px-3 py-2">First</th>
            <th className="text-left px-3 py-2">Last</th>
            <th className="text-left px-3 py-2">Email</th>
            <th className="text-left px-3 py-2">Password</th>
            <th className="text-left px-3 py-2">Date of birth</th>
            <th className="text-left px-3 py-2">Address</th>
            <th className="text-left px-3 py-2">Gender</th>
            <th className="text-left px-3 py-2">Role</th>
            <th className="text-center px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map((u, i) => (
              <tr key={u.id} className="hover:bg-cyan-50 border-b">
                <td className="px-3 py-2">{startIndex + i + 1}</td>
                <td className="px-3 py-2">{u.first_name}</td>
                <td className="px-3 py-2">{u.last_name}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">********</td>
                <td className="px-3 py-2">{u.dob}</td>
                <td className="px-3 py-2">{u.address}</td>
                <td className="px-3 py-2">{genders.find((g) => g.id === u.gender_id)?.name || "-"}</td>
                <td className="px-3 py-2">{roles.find((r) => r.id === u.roles_id)?.name || "-"}</td>
                <td className="px-3 py-2 text-center space-x-2">
                  <button onClick={() => onEdit(u)} className="text-cyan-800 hover:text-cyan-800">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDelete(u.id)} className="text-red-800 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-400">
                No matching records.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



export default UserTable;