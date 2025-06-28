import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

function Brand() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "active" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);

  const [brands, setBrands] = useState([
    { id: 1, name: "Coca-Cola", status: "active" },
    { id: 2, name: "Pepsi", status: "inactive" },
    { id: 3, name: "Sprite", status: "active" },
    { id: 4, name: "Fanta", status: "inactive" },
    { id: 5, name: "Dr Pepper", status: "active" },
    { id: 6, name: "Mountain Dew", status: "inactive" },
    { id: 7, name: "7UP", status: "active" },
    { id: 8, name: "Export Data", status: "inactive" },
    { id: 9, name: "Access Admin Panel", status: "active" },
    { id: 10, name: "Change Password", status: "inactive" },
    { id: 11, name: "Manage Billing", status: "active" },
    { id: 12, name: "View Logs", status: "inactive" },
    { id: 13, name: "Backup Database", status: "active" },
    { id: 14, name: "Create Reports", status: "inactive" },
    { id: 15, name: "Invite Members", status: "active" },
  ]);

  const filteredData = brands.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
      if ((currentPage - 1) * itemsPerPage >= filteredData.length - 1) {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    }
  };

  const toggleStatus = (id) => {
    setBrands((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "active" ? "inactive" : "active" }
          : b
      )
    );
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ name: "", status: "active" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (id) => {
    const brand = brands.find((b) => b.id === id);
    if (!brand) return;
    setEditId(id);
    setFormData({ name: brand.name, status: brand.status });
    setErrors({});
    setShowForm(true);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editId !== null) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editId ? { id: editId, ...formData } : b))
      );
    } else {
      const newId = brands.length ? Math.max(...brands.map((b) => b.id)) + 1 : 1;
      setBrands([...brands, { id: newId, ...formData }]);
    }

    setFormData({ name: "", status: "active" });
    setErrors({});
    setShowForm(false);
    setEditId(null);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const closeModal = (e) => {
    if (e.target.id === "modalOverlay") {
      setShowForm(false);
      setFormData({ name: "", status: "active" });
      setErrors({});
      setEditId(null);
    }
  };

  return (
    <div className="font-poppins">
      <p className="text-sm text-cyan-700 mb-4 font-medium">
        <span className="text-gray-500">/</span> Brands
      </p>
      <div className="p-4 bg-white shadow rounded-lg">
        {/* Top bar */}
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
              placeholder="Search by name..."
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div
              className="bg-white p-6 rounded-xl border w-full max-w-md shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: "", status: "active" });
                  setErrors({});
                  setEditId(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                &#x2715;
              </button>

              <h2 className="text-xl font-semibold mb-5 text-cyan-700">
                {editId !== null ? "Update Brand" : "Create Brand"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                    className={`mt-1 px-3 py-2 border rounded w-full ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 px-3 py-2 border border-gray-300 rounded w-full"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                >
                  {editId !== null ? "Update" : "Save"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {currentData.length > 0 ? (
                currentData.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-b even:bg-cyan-50 odd:bg-white hover:bg-cyan-100"
                  >
                    <td className="px-3 py-2">{startIndex + i + 1}</td>
                    <td className="px-4 py-2">{b.name}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleStatus(b.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          b.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {b.status === "active" ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button onClick={() => openEditForm(b.id)} title="Edit">
                        <Edit size={16} className="text-cyan-700 hover:text-cyan-900" />
                      </button>
                      <button onClick={() => handleDelete(b.id)} title="Delete">
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
            <button
              onClick={() => setCurrentPage(1)}
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
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border ${
                currentPage === 1
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-cyan-600 text-cyan-600 hover:bg-cyan-100"
              }`}
            >
              Prev
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
              onClick={() => setCurrentPage(totalPages)}
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

export default Brand;
