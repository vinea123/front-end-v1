import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/admin/brand";

function Brand() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "active" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Fetch brands from API
  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setBrands(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      alert("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filter brands by search
  const filteredData = brands.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

  // Adjust current page if needed after filter change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Pagination helper to change page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Delete brand API call
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      fetchBrands();

      // Adjust page if deleting last item on page
      if (
        (currentPage - 1) * itemsPerPage >= filteredData.length - 1 &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete brand");
    }
  };

  // Toggle status (update brand with flipped status)
  const toggleStatus = async (id) => {
    const brand = brands.find((b) => b.id === id);
    if (!brand) return;

    const updatedStatus = brand.status === "active" ? "inactive" : "active";
    const updatedBrand = { name: brand.name, status: updatedStatus };

    try {
      await axios.put(`${API_URL}/${id}`, updatedBrand, axiosConfig);

      // Optimistically update local state for immediate UI feedback
      setBrands((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: updatedStatus } : b
        )
      );
    } catch (error) {
      console.error("Status toggle failed:", error);
      alert("Failed to toggle status");
    }
  };

  // Open create form
  const openCreateForm = () => {
    setEditId(null);
    setFormData({ name: "", status: "active" });
    setErrors({});
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = (id) => {
    const brand = brands.find((b) => b.id === id);
    if (!brand) return;
    setEditId(id);
    setFormData({ name: brand.name, status: brand.status });
    setErrors({});
    setShowForm(true);
  };

  // Save (create or update)
  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editId !== null) {
        // Update
        await axios.put(`${API_URL}/${editId}`, formData, axiosConfig);
      } else {
        // Create
        await axios.post(API_URL, formData, axiosConfig);
      }
      setShowForm(false);
      setFormData({ name: "", status: "active" });
      setEditId(null);
      fetchBrands();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save brand");
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset page on items per page change
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
    
    <div className="font-poppins p-4">
      <div className="p-4 bg-white shadow rounded-lg">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-700"
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
                aria-label="Close modal"
              >
                &#x2715;
              </button>

              <h2 className="text-xl font-semibold mb-5 text-cyan-700">
                {editId !== null ? "Update Brand" : "Create Brand"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                    className={`mt-1 px-3 py-2 border rounded w-full ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter brand name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <div className="relative">
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                    >
                      <option value="" disabled>
                        Select status
                      </option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
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

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading brands...</p>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-cyan-800 rounded overflow-hidden">
              <thead className="bg-cyan-800 text-white">
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
                      className="border-b odd:bg-white hover:bg-cyan-100"
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
                          aria-label={`Toggle status for ${b.name}`}
                        >
                          {b.status === "active" ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center space-x-2">
                        <button
                          onClick={() => openEditForm(b.id)}
                          title="Edit"
                          aria-label={`Edit ${b.name}`}
                        >
                          <Edit
                            size={16}
                            className="text-cyan-700 hover:text-cyan-900"
                          />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          title="Delete"
                          aria-label={`Delete ${b.name}`}
                        >
                          <Trash2
                            size={16}
                            className="text-red-600 hover:text-red-800"
                          />
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
        )}

        {/* Pagination */}
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
                  ? "text-gray-300 border-gray-300"
                  : "text-cyan-600 border-cyan-600 hover:bg-cyan-100"
              }`}
            >
              First
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border ${
                currentPage === 1
                  ? "text-gray-300 border-gray-300"
                  : "text-cyan-600 border-cyan-600 hover:bg-cyan-100"
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
                        : "text-cyan-600 border-cyan-600 hover:bg-cyan-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
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
                  ? "text-gray-300 border-gray-300"
                  : "text-cyan-600 border-cyan-600 hover:bg-cyan-100"
              }`}
            >
              Next
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-300 border-gray-300"
                  : "text-cyan-600 border-cyan-600 hover:bg-cyan-100"
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



