import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

function Role() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Viewer" },
    { id: 4, name: "Moderator" },
    { id: 5, name: "Contributor" },
    { id: 6, name: "Super Admin" },
    { id: 7, name: "Manager" },
    { id: 8, name: "Analyst" },
    { id: 9, name: "Support" },
    { id: 10, name: "Developer" },
    { id: 11, name: "QA" },
    { id: 12, name: "Intern" },
    { id: 13, name: "Finance" },
    { id: 14, name: "HR" },
    { id: 15, name: "Marketing" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const filteredData = roles.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles((prev) => prev.filter((r) => r.id !== id));
      if ((currentPage - 1) * itemsPerPage >= filteredData.length - 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ name: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (id) => {
    const role = roles.find((r) => r.id === id);
    if (!role) return;
    setEditId(id);
    setFormData({ name: role.name });
    setErrors({});
    setShowForm(true);
  };

  const handleSave = () => {
    const requiredFields = ["name"];
    const newErrors = {};

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editId !== null) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editId ? { id: editId, ...formData } : r))
      );
    } else {
      const newId = roles.length ? Math.max(...roles.map((r) => r.id)) + 1 : 1;
      setRoles([...roles, { id: newId, ...formData }]);
    }

    setFormData({ name: "" });
    setErrors({});
    setShowForm(false);
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
      setFormData({ name: "" });
      setErrors({});
      setEditId(null);
    }
  };

  return (
    <div className="font-poppins">
      <p className="text-sm text-cyan-700 mb-4 font-medium">
        <span className="text-gray-500">\</span> Roles
      </p>
      <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          >
            Create
          </button>

          <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by name..."
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

        {/* Modal */}
        {showForm && (
          <div
            id="modalOverlay"
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity"
          >
            <div
              className="bg-white p-6 rounded-xl border border-cyan-200 w-full max-w-md shadow-lg relative
                         flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: "" });
                  setErrors({});
                  setEditId(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                &#x2715;
              </button>

              <h2 className="text-xl font-semibold mb-5 border-b border-cyan-300 pb-2 text-cyan-700">
                {editId !== null ? "Update Role" : "Create New Role"}
              </h2>

              <div className="grid md:grid-cols-1 gap-5 mb-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Enter role name"
                    className={`mt-2 px-4 py-2 border rounded-lg text-sm transition
                      focus:outline-none focus:ring-2 focus:ring-cyan-500
                      ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-cyan-500"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1 italic">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700
                             focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                >
                  {editId !== null ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "" });
                    setErrors({});
                    setEditId(null);
                  }}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300
                             focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
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
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {currentData.length > 0 ? (
                currentData.map((r, i) => (
                  <tr
                    key={`${r.id}-${startIndex + i}`}
                    className="border-b last:border-none odd:bg-white even:bg-cyan-50 hover:bg-cyan-100 transition"
                  >
                    <td className="px-3 py-2">{startIndex + i + 1}</td>
                    <td className="px-4 py-2">{r.name}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        title="Update"
                        onClick={() => openEditForm(r.id)}
                        className="text-cyan-700 hover:text-cyan-900 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(r.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
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
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center space-x-1">
            {/* Pagination Buttons */}
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
    </div>
  );
}

export default Role;
