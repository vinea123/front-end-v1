import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Select from "react-select";

function Role_Permission() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const [rolePermissions, setRolePermissions] = useState([
    { id: 1, role_name: "Admin", permission_name: "Create User" },
    { id: 2, role_name: "User", permission_name: "View Dashboard" },
    { id: 3, role_name: "Manager", permission_name: "Edit Reports" },
    { id: 4, role_name: "Admin", permission_name: "Delete User" },
    { id: 5, role_name: "User", permission_name: "Edit Profile" },
    { id: 6, role_name: "Manager", permission_name: "Approve Leaves" },
    { id: 7, role_name: "Admin", permission_name: "Manage Settings" },
    { id: 8, role_name: "User", permission_name: "Submit Feedback" },
    { id: 9, role_name: "Manager", permission_name: "Generate Reports" },
    { id: 10, role_name: "Admin", permission_name: "Access Logs" },
    { id: 11, role_name: "User", permission_name: "Change Password" },
    { id: 12, role_name: "Manager", permission_name: "Assign Tasks" },
    { id: 13, role_name: "Admin", permission_name: "Manage Roles" },
    { id: 14, role_name: "User", permission_name: "View Notifications" },
    { id: 15, role_name: "Manager", permission_name: "Approve Budgets" },
    { id: 16, role_name: "Admin", permission_name: "Backup Data" },
    { id: 17, role_name: "User", permission_name: "View Profile" },
    { id: 18, role_name: "Manager", permission_name: "Manage Team" },
    { id: 19, role_name: "Admin", permission_name: "Audit Logs" },
    { id: 20, role_name: "User", permission_name: "Access Help" },
    { id: 21, role_name: "Manager", permission_name: "Schedule Meetings" },
  ]);

  const [formData, setFormData] = useState({ role_name: "", permission_name: "" });

  const roleOptions = [...new Set(rolePermissions.map((r) => r.role_name))].map((role) => ({
    value: role,
    label: role,
  }));

  const permissionOptions = [...new Set(rolePermissions.map((r) => r.permission_name))].map((perm) => ({
    value: perm,
    label: perm,
  }));

  const filteredData = rolePermissions.filter(
    (item) =>
      item.role_name.toLowerCase().includes(search.toLowerCase()) ||
      item.permission_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role-permission?")) {
      setRolePermissions((prev) => prev.filter((p) => p.id !== id));
      if ((filteredData.length - 1) <= startIndex && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ role_name: "", permission_name: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (id) => {
    const pair = rolePermissions.find((p) => p.id === id);
    if (!pair) return;
    setEditId(id);
    setFormData({ role_name: pair.role_name, permission_name: pair.permission_name });
    setErrors({});
    setShowForm(true);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.role_name.trim()) newErrors.role_name = "Role name is required";
    if (!formData.permission_name.trim()) newErrors.permission_name = "Permission name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editId !== null) {
      setRolePermissions((prev) =>
        prev.map((p) => (p.id === editId ? { id: editId, ...formData } : p))
      );
    } else {
      const newId = rolePermissions.length ? Math.max(...rolePermissions.map((p) => p.id)) + 1 : 1;
      setRolePermissions([...rolePermissions, { id: newId, ...formData }]);
      setCurrentPage(totalPages);
    }

    setShowForm(false);
    setFormData({ role_name: "", permission_name: "" });
    setEditId(null);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const closeModal = (e) => {
    if (e.target.id === "modalOverlay") {
      setShowForm(false);
      setFormData({ role_name: "", permission_name: "" });
      setErrors({});
      setEditId(null);
    }
  };

  return (
    <div className="font-poppins">
      <p className="text-sm text-cyan-700 mb-4 font-medium">
        <span className="text-gray-500">\</span> Role Permissions
      </p>

      <div className="p-4 bg-white shadow rounded-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Create
          </button>

          <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto">
            <input
              type="text"
              placeholder="Search role or permission..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-cyan-300 rounded text-sm w-full md:w-64"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-cyan-300 rounded px-2 py-1 text-sm"
              >
                {[10, 20, 30, 50].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">items</span>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div
            id="modalOverlay"
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              className="bg-white p-6 rounded-xl border w-full max-w-md shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({ role_name: "", permission_name: "" });
                  setErrors({});
                  setEditId(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                &#x2715;
              </button>

              <h2 className="text-xl font-semibold mb-5 text-cyan-700">
                {editId !== null ? "Update Role Permission" : "Create Role Permission"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role Name</label>
                  <Select
                    options={roleOptions}
                    value={roleOptions.find((r) => r.value === formData.role_name)}
                    onChange={(option) =>
                      setFormData({ ...formData, role_name: option?.value || "" })
                    }
                    placeholder="Select a role"
                    className="mt-1"
                  />
                  {errors.role_name && (
                    <p className="text-red-600 text-xs mt-1">{errors.role_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Permission Name</label>
                  <Select
                    options={permissionOptions}
                    value={permissionOptions.find((p) => p.value === formData.permission_name)}
                    onChange={(option) =>
                      setFormData({ ...formData, permission_name: option?.value || "" })
                    }
                    placeholder="Select a permission"
                    className="mt-1"
                  />
                  {errors.permission_name && (
                    <p className="text-red-600 text-xs mt-1">{errors.permission_name}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  {editId !== null ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border border-cyan-600 rounded overflow-hidden">
            <thead className="bg-cyan-600 text-white">
              <tr>
                <th className="px-3 py-2 text-left font-medium">No</th>
                <th className="px-4 py-2 text-left font-medium">Role</th>
                <th className="px-4 py-2 text-left font-medium">Permission</th>
                <th className="px-4 py-2 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {currentData.length > 0 ? (
                currentData.map((p, i) => (
                  <tr key={p.id} className="border-b even:bg-cyan-50 odd:bg-white hover:bg-cyan-100">
                    <td className="px-3 py-2">{startIndex + i + 1}</td>
                    <td className="px-4 py-2">{p.role_name}</td>
                    <td className="px-4 py-2">{p.permission_name}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button onClick={() => openEditForm(p.id)} title="Edit">
                        <Edit size={16} className="text-cyan-700 hover:text-cyan-900" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} title="Delete">
                        <Trash2 size={16} className="text-red-600 hover:text-red-800" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No matching results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
          <div className="text-gray-600">
            Showing {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-1">
            {["First", "Prev"].map((label, i) => (
              <button
                key={label}
                onClick={() => goToPage(currentPage + (i === 0 ? -currentPage + 1 : -1))}
                disabled={currentPage === 1}
                className={`px-2 py-1 rounded border ${
                  currentPage === 1
                    ? "border-gray-300 text-gray-300 cursor-not-allowed"
                    : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
                }`}
              >
                {label}
              </button>
            ))}

            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page
                        ? "bg-cyan-600 text-white border-cyan-600"
                        : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                (page === currentPage - 2 && page > 1) ||
                (page === currentPage + 2 && page < totalPages)
              ) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            {["Next", "Last"].map((label, i) => (
              <button
                key={label}
                onClick={() => goToPage(currentPage + (i === 0 ? 1 : totalPages - currentPage))}
                disabled={currentPage === totalPages}
                className={`px-2 py-1 rounded border ${
                  currentPage === totalPages
                    ? "border-gray-300 text-gray-300 cursor-not-allowed"
                    : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Role_Permission;
