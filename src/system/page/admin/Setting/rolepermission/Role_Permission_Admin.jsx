import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RolePermissionModal from "./components/RolePermissionModal";
import RolePermissionTable from "./components/RolePermissionTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Alert from "./components/Alert"; // make sure Alert.jsx is in components folder

const API_URL = `${import.meta.env.VITE_API_URL}/admin/rolepermission`;
const ROLES_URL = `${import.meta.env.VITE_API_URL}/admin/roles`;
const PERMISSIONS_URL = `${import.meta.env.VITE_API_URL}/admin/permission`;
const MIN_LOADING_TIME = 1000;

function Role_Permission() {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const showAlert = (message, type = "info") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "info" });
    }, 3000);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let loadingTimer;

    const fetchAll = async () => {
      try {
        loadingTimer = setTimeout(() => setMinimumLoadingDone(true), MIN_LOADING_TIME);

        await Promise.all([fetchRoles(), fetchPermissions(), fetchRolePermissions()]);

        if (!minimumLoadingDone) {
          await new Promise((resolve) => {
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
        console.error("Initialization error:", error);
        if (!minimumLoadingDone) {
          await new Promise((resolve) => {
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
        showAlert("Failed to load data", "error");
      } finally {
        clearTimeout(loadingTimer);
      }
    };

    fetchAll();

    return () => clearTimeout(loadingTimer);
  }, [token, navigate, minimumLoadingDone]);

  const fetchRolePermissions = async () => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      setRolePermissions(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch role-permissions:", error);
      throw error;
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get(ROLES_URL, axiosConfig);
      setRoles(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      throw error;
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get(PERMISSIONS_URL, axiosConfig);
      setPermissions(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      throw error;
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

  const filteredData = rolePermissions.filter(
    (rp) =>
      getRoleName(rp.roles_id).toLowerCase().includes(search.toLowerCase()) ||
      getPermissionName(rp.permission_id).toLowerCase().includes(search.toLowerCase())
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

      <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={() => {
              setEditId(null);
              setFormData({ roles_id: "", permission_id: "" });
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
              className="px-3 py-1.5 border border-cyan-700 rounded text-sm w-full md:w-64"
            />
            <div className="flex items-center gap-1">
              <label className="text-sm text-gray-600">Show</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-cyan-700 rounded px-2 py-1 text-sm"
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

        <RolePermissionTable
          currentData={currentData}
          startIndex={startIndex}
          getRoleName={getRoleName}
          getPermissionName={getPermissionName}
          onEdit={(item) => {
            setEditId(item.id);
            setFormData({
              roles_id: item.roles_id,
              permission_id: item.permission_id,
            });
            setShowForm(true);
          }}
          onDelete={async (id) => {
            if (!window.confirm("Delete this role-permission?")) return;
            try {
              await axios.delete(`${API_URL}/${id}`, axiosConfig);
              showAlert("Deleted successfully", "success");
              await fetchRolePermissions();
            } catch (error) {
              console.error("Delete failed:", error);
              showAlert("Failed to delete", "error");
            }
          }}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          filteredData={filteredData}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <RolePermissionModal
        showForm={showForm}
        onClose={() => setShowForm(false)}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        editId={editId}
        roles={roles}
        permissions={permissions}
        onSubmit={async () => {
          const newErrors = {};
          if (!formData.roles_id) newErrors.roles_id = "Role is required";
          if (!formData.permission_id) newErrors.permission_id = "Permission is required";
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
            await fetchRolePermissions();
          } catch (error) {
            console.error("Not found:", error);
            showAlert("Not found", "error");
          }
        }}
      />
    </div>
  );
}

export default Role_Permission;
