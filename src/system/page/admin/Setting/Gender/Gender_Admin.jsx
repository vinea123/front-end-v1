import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GenderModal from "./components/GenderModal";
import GenderTable from "./components/GenderTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Alert from "./components/Alert";

const API_URL = `${import.meta.env.VITE_API_URL}/admin/gender`;
const MIN_LOADING_TIME = 1000;

function Gender() {
  const navigate = useNavigate();
  const [genders, setGenders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);
  const [alerts, setAlerts] = useState([]);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const showAlert = (message, type = 'info', duration = 3000, position = 'top-right') => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { id, message, type, duration, position }]);
    
    if (duration) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }
  };

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleAuthError = (error) => {
    if (error.response?.status === 401) {
      showAlert("Session expired. Please login again.", 'error', 3000, 'top-center');
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error(error);
      showAlert(error.response?.data?.message || "Something went wrong", 'error');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let loadingTimer;

    const fetchData = async () => {
      try {
        loadingTimer = setTimeout(() => {
          setMinimumLoadingDone(true);
        }, MIN_LOADING_TIME);

        const res = await axios.get(API_URL, axiosConfig);
        setGenders(res.data.data || []);

        if (!minimumLoadingDone) {
          await new Promise(resolve => {
            const interval = setInterval(() => {
              if (minimumLoadingDone) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch genders:", error);
        
        if (!minimumLoadingDone) {
          await new Promise(resolve => {
            const interval = setInterval(() => {
              if (minimumLoadingDone) {
                clearInterval(interval);
                resolve();
              }
            }, 100);
          });
        }

        setLoading(false);
        setLoadingFailed(true);
        handleAuthError(error);
      } finally {
        clearTimeout(loadingTimer);
      }
    };

    fetchData();

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [token, navigate, minimumLoadingDone]);

  const handleSave = async () => {
    const name = formData.name.trim();
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // showAlert("Please fix the form errors", 'error');
      return;
    }

    setSaving(true);
    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, { name }, axiosConfig);
        showAlert("Updated successfully", 'success');
      } else {
        await axios.post(API_URL, { name }, axiosConfig);
        showAlert("Created successfully", 'success');
      }
      closeForm();
      await fetchGenders();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setSaving(false);
    }
  };

  const fetchGenders = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setGenders(res.data.data || []);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gender?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      showAlert("Deleted successfully", 'success');
      await fetchGenders();
    } catch (error) {
      handleAuthError(error);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const openCreateForm = () => {
    setEditId(null);
    setFormData({ name: "" });
    setErrors({});
    setShowForm(true);
  };

  const openEditForm = (gender) => {
    setEditId(gender.id);
    setFormData({ name: gender.name });
    setErrors({});
    setShowForm(true);
  };

  const closeForm = () => {
    setEditId(null);
    setFormData({ name: "" });
    setErrors({});
    setShowForm(false);
  };

  const filteredData = genders.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <Loading />
      </div>
    );
  }

 

  return (
    <div className="font-poppins p-4">
      {/* Render all alerts */}
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onClose={() => removeAlert(alert.id)}
          duration={alert.duration}
          position={alert.position}
        />
      ))}

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-700"
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
              className="px-3 py-1.5 border border-cyan-800 rounded text-sm w-full md:w-64"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-cyan-800 rounded px-2 py-1 text-sm"
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

        <GenderTable
          currentData={currentData}
          startIndex={startIndex}
          openEditForm={openEditForm}
          handleDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          filteredData={filteredData}
          goToPage={goToPage}
        />
      </div>

      <GenderModal
        showForm={showForm}
        closeForm={closeForm}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        editId={editId}
        saving={saving}
        handleSave={handleSave}
      />
    </div>
  );
}

export default Gender;