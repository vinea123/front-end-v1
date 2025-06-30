import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/admin/permission";

function Permission() {
  const [permissions, setPermissions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setPermissions(res.data.data || []);
    } catch (error) {
      console.error("Fetch permissions error:", error);
      alert("Failed to load permission data.");
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleSave = async () => {
    const name = formData.name.trim();
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, { name }, axiosConfig);
      } else {
        await axios.post(API_URL, { name }, axiosConfig);
      }
      closeForm();
      fetchPermissions();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save permission.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this permission?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      fetchPermissions();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete permission.");
    }
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ name: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (permission) => {
    setEditId(permission.id);
    setFormData({ name: permission.name });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setEditId(null);
    setFormData({ name: "" });
    setErrors({});
    setShowForm(false);
  };

  const filteredData = permissions.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="font-poppins p-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            // onClick={openCreateForm}
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
                <th className="text-left px-3 py-2">No</th>
                <th className="text-left px-3 py-2">Name</th>
                <th className="text-center px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length ? (
                currentData.map((p, i) => (
                  <tr key={p.id} className="hover:bg-cyan-50 border-b">
                    <td className="px-3 py-2">{startIndex + i + 1}</td>
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2 text-center space-x-2">
                      <button
                        // onClick={() => openEditForm(p)}
                        className="text-cyan-700"
                        aria-label="Edit permission"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        // onClick={() => handleDelete(p.id)}
                        className="text-red-600"
                        aria-label="Delete permission"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center px-4 py-4 text-gray-500"
                  >
                    No matching records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
          <div className="text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border ${
                currentPage === 1
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
              }`}
            >
              First
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border ${
                currentPage === 1
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
              }`}
            >
              Prev
            </button>

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

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border ${
                currentPage === totalPages
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
              }`}
            >
              Next
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border ${
                currentPage === totalPages
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
              }`}
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeForm()}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close form"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editId !== null ? "Update Permission" : "Create Permission"}
            </h2>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="permission-name"
              >
                Name
              </label>
              <input
                id="permission-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ name: e.target.value });
                  setErrors({});
                }}
                className="w-full border px-3 py-2 rounded text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1" role="alert">
                  {errors.name}
                </p>
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

export default Permission;
