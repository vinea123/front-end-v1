import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/admin/users";
const GENDER_URL = "http://127.0.0.1:8000/admin/gender";
const ROLE_URL = "http://127.0.0.1:8000/admin/roles";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    dob: "",
    address: "",
    gender_id: "",
    roles_id: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [userRes, genderRes, roleRes] = await Promise.all([
        axios.get(API_URL, axiosConfig),
        axios.get(GENDER_URL, axiosConfig),
        axios.get(ROLE_URL, axiosConfig),
      ]);
      setUsers(userRes.data.data || []);
      setGenders(genderRes.data.data || []);
      setRoles(roleRes.data.data || []);
    } catch (err) {
      alert("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const { first_name, last_name, email, gender_id, roles_id, password, dob, address } = formData;
    const newErrors = {};
    if (!first_name) newErrors.first_name = "First name required";
    if (!last_name) newErrors.last_name = "Last name required";
    if (!email) newErrors.email = "Email required";
    if (editId === null && !password) newErrors.password = "Password required";
    if (editId === null && !dob) newErrors.dob = "Date of birth required";
    if (editId === null && !address) newErrors.address = "Address required";
    if (!gender_id) newErrors.gender_id = "Gender required";
    if (!roles_id) newErrors.roles_id = "Role required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      // If updating, omit password if left blank to avoid overwriting with empty
      const payload =
        editId !== null && !password
          ? { ...formData, password: undefined }
          : formData;

      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, payload, axiosConfig);
      } else {
        await axios.post(API_URL, payload, axiosConfig);
      }
      closeForm();
      fetchAll();
    } catch (err) {
      alert("Save failed.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      fetchAll();
    } catch (err) {
      alert("Delete failed.");
      console.error(err);
    }
  };

  const openForm = (user = null) => {
    if (user) {
      setEditId(user.id);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "", // leave blank on edit for password
        dob: user.dob || "",
        address: user.address || "",
        gender_id: user.gender_id,
        roles_id: user.roles_id,
      });
    } else {
      setEditId(null);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        dob: "",
        address: "",
        gender_id: "",
        roles_id: "",
      });
    }
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      dob: "",
      address: "",
      gender_id: "",
      roles_id: "",
    });
    setErrors({});
  };

  // Filter + Pagination
  const filteredData = users.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
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
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            onClick={() => openForm()}
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

        {/* Table */}
          <div className="overflow-x-auto">
          <table className="min-w-full text-xs border border-cyan-600 rounded overflow-hidden">
            <thead className="bg-cyan-600 text-white">
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
                {currentData.length ? (
                  currentData.map((u, i) => (
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
                        <button onClick={() => openForm(u)} className="text-cyan-700">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(u.id)} className="text-red-600">
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
          <div className="text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
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
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">{editId !== null ? "Update User" : "Create User"}</h2>

            {["first_name", "last_name", "email"].map((field) => (
              <div key={field} className="mb-3">
                <label className="block text-sm mb-1 capitalize">{field.replace("_", " ")}</label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                />
                {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
              </div>
            ))}

            {/* Password input */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder={editId !== null ? "Leave blank to keep current password" : ""}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>


            {/* Date of birth input */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Date of birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
            </div>

            {/* Address input */}
            <div className="mb-3">
              <label className="block text-sm mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>

            
            <div className="mb-3">
              <label className="block text-sm mb-1">Gender</label>
              <select
                value={formData.gender_id}
                onChange={(e) => setFormData({ ...formData, gender_id: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select</option>
                {genders.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
              {errors.gender_id && <p className="text-red-500 text-xs">{errors.gender_id}</p>}
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1">Role</label>
              <select
                value={formData.roles_id}
                onChange={(e) => setFormData({ ...formData, roles_id: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              {errors.roles_id && <p className="text-red-500 text-xs">{errors.roles_id}</p>}
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

export default ManageUser;
