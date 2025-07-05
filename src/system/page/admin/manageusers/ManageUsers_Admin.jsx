import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserModal from "./components/UserModal";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Alert from "./components/Alert";


const USER_URL = `${import.meta.env.VITE_API_URL}/admin/users`;
const GENDER_URL = `${import.meta.env.VITE_API_URL}/admin/gender`;
const ROLE_URL = `${import.meta.env.VITE_API_URL}/admin/roles`;
const LOADING_TIME = 1000; // 1 second loading time

function ManageUser() {
  const navigate = useNavigate();

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
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  const handleApiError = (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      showAlert(err.response?.data?.message || "Not found", "error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const loadingTimer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, LOADING_TIME);

    fetchAll();

    return () => clearTimeout(loadingTimer);
  }, [navigate, token]);

  const fetchAll = async () => {
    try {
      const [userRes, genderRes, roleRes] = await Promise.all([
        axios.get(USER_URL, axiosConfig),
        axios.get(GENDER_URL, axiosConfig),
        axios.get(ROLE_URL, axiosConfig),
      ]);
      setUsers(userRes.data.data || []);
      setGenders(genderRes.data.data || []);
      setRoles(roleRes.data.data || []);
    } catch (err) {
      handleApiError(err);
    } finally {
      setTimeout(() => setLoading(false), LOADING_TIME);
    }
  };

  const handleSave = async () => {
    const {
      first_name,
      last_name,
      email,
      password,
      dob,
      address,
      gender_id,
      roles_id,
    } = formData;

    const newErrors = {};
    if (!first_name) newErrors.first_name = "First name required";
    if (!last_name) newErrors.last_name = "Last name required";
    if (!email) newErrors.email = "Email required";
    if (editId === null && !password) newErrors.password = "Password required";
    if (editId === null && password && password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (editId === null && !dob) newErrors.dob = "Date of birth required";
    if (editId === null && !address) newErrors.address = "Address required";
    if (!gender_id) newErrors.gender_id = "Gender required";
    if (!roles_id) newErrors.roles_id = "Role required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      // If editing and password is empty, don't send password
      const payload =
        editId !== null && !password
          ? { ...formData, password: undefined }
          : formData;

      if (editId !== null) {
        await axios.put(`${USER_URL}/${editId}`, payload, axiosConfig);
        showAlert("Updated successfully", "success");
      } else {
        await axios.post(USER_URL, payload, axiosConfig);
        showAlert("Created successfully", "success");
      }
      closeForm();
      fetchAll();
    } catch (err) {
      handleApiError(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${USER_URL}/${id}`, axiosConfig);
      showAlert("Deleted successfully", "success");
      fetchAll();
    } catch (err) {
      handleApiError(err);
    }
  };

  const openForm = (user = null) => {
    if (user) {
      setEditId(user.id);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: "",
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

  const filteredData = users.filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="font-poppins p-4">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "info" })}
        />
      )}

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            onClick={() => openForm()}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-600"
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
              className="px-3 py-1.5 border border-cyan-800 rounded focus:ring-2 focus:ring-cyan-500 text-sm w-full md:w-64"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-cyan-800 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-cyan-500"
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

        <UserTable
          users={currentData}
          startIndex={startIndex}
          genders={genders}
          roles={roles}
          onEdit={openForm}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredData.length}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          goToPage={(page) => setCurrentPage(page)}
        />

        <UserModal
          show={showForm}
          onClose={closeForm}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          genders={genders}
          roles={roles}
          editId={editId}
          onSave={handleSave}
          saving={saving}
        />
      </div>
    </div>
  );
}

export default ManageUser;
