import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/admin/rolepermission";
const ROLES_URL = "http://127.0.0.1:8000/admin/roles";
const PERMISSIONS_URL = "http://127.0.0.1:8000/admin/permission";

function Role_Permission() {
  const [rolePermissions, setRolePermissions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ roles_id: "", permission_id: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([fetchRoles(), fetchPermissions(), fetchRolePermissions()]);
    };
    fetchAll();
  }, []);

  const fetchRolePermissions = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setRolePermissions(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch role-permissions:", error);
      alert("Failed to load role-permission data.");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(ROLES_URL, axiosConfig);
      setRoles(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(PERMISSIONS_URL, axiosConfig);
      setPermissions(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
    }
  };

  const getRoleName = (id) => {
    const role = roles.find((r) => Number(r.id) === Number(id));
    return role ? role.name : `ID: ${id}`;
  };

  const getPermissionName = (id) => {
    const perm = permissions.find((p) => Number(p.id) === Number(id));
    return perm?.name || perm?.permission || perm?.title || `ID: ${id}`;
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.roles_id) newErrors.roles_id = "Role is required";
    if (!formData.permission_id) newErrors.permission_id = "Permission is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, formData, axiosConfig);
      } else {
        await axios.post(API_URL, formData, axiosConfig);
      }
      closeForm();
      fetchRolePermissions();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save role-permission.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this role-permission?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      fetchRolePermissions();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete role-permission.");
    }
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ roles_id: "", permission_id: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditId(item.id);
    setFormData({
      roles_id: item.roles_id,
      permission_id: item.permission_id,
    });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setEditId(null);
    setFormData({ roles_id: "", permission_id: "" });
    setErrors({});
    setShowForm(false);
  };

  const filteredData = rolePermissions.filter(
    (rp) =>
      getRoleName(rp.roles_id).toLowerCase().includes(search.toLowerCase()) ||
      getPermissionName(rp.permission_id).toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredData.length, itemsPerPage, totalPages]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  return (
    <div className="font-poppins p-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
          >
            Create
          </button>

          <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 border border-cyan-300 rounded focus:ring-2 focus:ring-cyan-500 text-sm w-full md:w-64"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-cyan-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-cyan-500"
              >
                {[10, 20, 30, 40, 50].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">items</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border border-cyan-600 rounded overflow-hidden">
            <thead className="bg-cyan-600 text-white">
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
                      <button onClick={() => openEditForm(rp)} className="text-cyan-700">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(rp.id)} className="text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-4 text-gray-500">
                    No matching records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
          <div className="text-gray-600">
            Showing {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>

          <div className="flex items-center space-x-1">
            {["First", "Prev"].map((label, idx) => (
              <button
                key={label}
                onClick={() => goToPage(currentPage + (idx === 0 ? -currentPage + 1 : -1))}
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

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
              .map((page, i, arr) => {
                const prev = arr[i - 1];
                return [
                  prev && page - prev > 1 ? (
                    <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>
                  ) : null,
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
                ];
              })}

            {["Next", "Last"].map((label, idx) => (
              <button
                key={label}
                onClick={() => goToPage(currentPage + (idx === 0 ? 1 : totalPages - currentPage))}
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

      {alert.message && (
        <div
          className={`flex items-center w-full gap-4 px-4 py-3 text-sm border rounded mb-4 ${
            alert.type === "success"
              ? "border-emerald-100 bg-emerald-50 text-emerald-600"
              : "border-red-100 bg-red-50 text-red-600"
          }`}
          role="alert"
        >
          <p className="flex-1">{alert.message}</p>
          <button
            onClick={() => setAlert({ type: "", message: "" })}
            aria-label="Close"
            className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-opacity-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editId !== null ? "Update Role-Permission" : "Create Role-Permission"}
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={formData.roles_id}
                onChange={(e) =>
                  setFormData({ ...formData, roles_id: e.target.value ? Number(e.target.value) : "" })
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
                  setFormData({ ...formData, permission_id: e.target.value ? Number(e.target.value) : "" })
                }
                className="w-full border px-3 py-2 rounded text-sm"
              >
                <option value="">Select Permission</option>
                {permissions.map((perm) => (
                  <option key={perm.id} value={perm.id}>
                    {perm.name}
                  </option>
                ))}
              </select>
              {errors.permission_id && (
                <p className="text-red-500 text-xs mt-1">{errors.permission_id}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
              >
                {editId !== null ? "Update" : "Save"}
              </button>
              <button
                onClick={closeForm}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Role_Permission;
