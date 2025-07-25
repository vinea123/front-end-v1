import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PermissionModal from "./components/PermissionModal";
import PermissionTable from "./components/PermissionTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";

const API_URL = `${import.meta.env.VITE_API_URL}/admin/permission`;
const MIN_LOADING_TIME = 1000; // 1 seconds minimum loading

function Permission() {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
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

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleAuthError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setPermissions(res.data.data || []);
    } catch (error) {
      handleAuthError(error);
      throw error;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let loadingTimer;

    const loadData = async () => {
      try {
        // Set minimum loading timer
        loadingTimer = setTimeout(() => {
          setMinimumLoadingDone(true);
        }, MIN_LOADING_TIME);

        await fetchPermissions();

        // Wait for minimum loading time if needed
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
        // Wait for minimum loading time if needed
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
      } finally {
        clearTimeout(loadingTimer);
      }
    };

    loadData();

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [token, navigate, minimumLoadingDone]);

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
        toast.success("Permission updated successfully");
      } else {
        await axios.post(API_URL, { name }, axiosConfig);
        toast.success("Permission created successfully");
      }
      closeForm();
      fetchPermissions();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this permission?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      toast.success("Permission deleted successfully");
      fetchPermissions();
    } catch (error) {
      handleAuthError(error);
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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <Loading />
      </div>
    );
  }


  return (
    <div className="font-poppins p-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <button
            // onClick={openCreateForm}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-700 transition-colors"
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
              className="px-3 py-1.5 border border-cyan-800 rounded text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-cyan-800 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-800"
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

        <PermissionTable
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

      <PermissionModal
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

export default Permission;