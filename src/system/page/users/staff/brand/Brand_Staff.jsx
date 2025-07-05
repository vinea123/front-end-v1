import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔴 You forgot to import this
import axios from "axios";
import BrandModal from "./components/BrandModal";
import BrandTable from "./components/BrandTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Alert from "./components/Alert";

const API_URL = `${import.meta.env.VITE_API_URL}/users/brand`;
const MIN_LOADING_TIME = 1000;

function Brand() {
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate(); // ✅ Use navigate inside the component

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const showAlert = (message, type = "info", duration = 3000, position = "top-right") => {
    setAlert({ message, type, duration, position });
    if (duration) {
      setTimeout(() => setAlert(null), duration);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setBrands(res.data.data || []);
      setLoadingFailed(false);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      setLoadingFailed(true);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        showAlert("Failed to fetch brands", "error");
      }
    }
  };

  useEffect(() => {
    let loadingTimer;

    const loadData = async () => {
      loadingTimer = setTimeout(() => {
        setLoading(false);
      }, MIN_LOADING_TIME);

      await fetchBrands();
    };

    loadData();

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  const filteredData = brands.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      await fetchBrands();
      showAlert("Deleted successfully", "success");
    } catch (error) {
      console.error("Delete failed:", error);
      if (error.response?.status === 403) {
        showAlert("Permission denied", "permission");
      } else {
        showAlert("Failed to delete brand", "error");
      }
    }
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, formData, axiosConfig);
        showAlert("Updated successfully", "success");
      } else {
        await axios.post(API_URL, formData, axiosConfig);
        showAlert("Created successfully", "success");
      }
      setShowForm(false);
      await fetchBrands();
    } catch (error) {
      console.error("Save failed:", error);
      if (error.response?.status === 403) {
        showAlert("Permission denied", "permission");
      } else {
        showAlert("Not found", "error");
      }
    }
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
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          position={alert.position}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={() => {
              setEditId(null);
              setFormData({ name: "" });
              setShowForm(true);
            }}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded-lg hover:bg-cyan-700"
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

        <BrandModal
          showForm={showForm}
          onClose={() => {
            setShowForm(false);
            setFormData({ name: "" });
            setErrors({});
            setEditId(null);
          }}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          editId={editId}
          onSave={handleSave}
        />

        <BrandTable
          currentData={currentData}
          startIndex={startIndex}
          onEdit={(id) => {
            const brand = brands.find((b) => b.id === id);
            if (!brand) return;
            setEditId(id);
            setFormData({ name: brand.name });
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          filteredData={filteredData}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Brand;
