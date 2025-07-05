// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import BrandModal from "./components/BrandModal";
// import BrandTable from "./components/BrandTable";
// import Pagination from "./components/Pagination";
// import Loading from "./components/Loading";
// import Alert from "./components/Alert";

// const API_URL = "http://127.0.0.1:8000/admin/brand";
// const MIN_LOADING_TIME = 1000; 

// function Brand() {
//   const navigate = useNavigate();
//   const [brands, setBrands] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ name: "", status: "active" });
//   const [errors, setErrors] = useState({});
//   const [editId, setEditId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadingFailed, setLoadingFailed] = useState(false);
//   const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);
//   const [alert, setAlert] = useState(null);

//   const token = localStorage.getItem("token");
//   const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

//   const showAlert = (message, type = 'success', duration = 3000) => {
//     setAlert({ message, type });
//     if (duration) {
//       setTimeout(() => setAlert(null), duration);
//     }
//   };

//   const showSuccessToast = (message) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "colored",
//       style: {
//         backgroundColor: '#4BB543',
//         color: '#fff',
//       },
//       icon: '✅',
//     });
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     let loadingTimer;

//     const fetchBrands = async () => {
//       try {
//         loadingTimer = setTimeout(() => {
//           setMinimumLoadingDone(true);
//         }, MIN_LOADING_TIME);

//         const res = await axios.get(API_URL, axiosConfig);
//         setBrands(res.data.data || []);

//         if (!minimumLoadingDone) {
//           await new Promise(resolve => {
//             const interval = setInterval(() => {
//               if (minimumLoadingDone) {
//                 clearInterval(interval);
//                 resolve();
//               }
//             }, 100);
//           });
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch brands:", error);
        
//         if (!minimumLoadingDone) {
//           await new Promise(resolve => {
//             const interval = setInterval(() => {
//               if (minimumLoadingDone) {
//                 clearInterval(interval);
//                 resolve();
//               }
//             }, 100);
//           });
//         }

//         setIsLoading(false);
//         setLoadingFailed(true);
//         if (error.response?.status === 401) {
//           handleUnauthorized();
//         } else {
//           showAlert("Failed to fetch brands", "error");
//           toast.error("Failed to fetch brands");
//         }
//       } finally {
//         clearTimeout(loadingTimer);
//       }
//     };

//     fetchBrands();

//     return () => {
//       clearTimeout(loadingTimer);
//     };
//   }, [token, navigate, minimumLoadingDone]);

//   const handleUnauthorized = () => {
//     showAlert("Session expired. Please login again.", "error");
//     toast.error("Session expired. Please login again.", {
//       position: "top-center",
//       autoClose: 3000,
//     });
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const filteredData = brands.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [totalPages, currentPage]);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this brand?")) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`, axiosConfig);
//       showSuccessToast("Deleted successfully");
//       showAlert("Deleted successfully", "success");
//       setBrands(brands.filter(brand => brand.id !== id));
//       if ((currentPage - 1) * itemsPerPage >= filteredData.length - 1 && currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//     } catch (error) {
//       console.error("Delete failed:", error);
//       if (error.response?.status === 401) {
//         handleUnauthorized();
//       } else {
//         showAlert("Failed to delete brand", "error");
//         toast.error("Failed to delete brand");
//       }
//     }
//   };

//   const toggleStatus = async (id) => {
//     const brand = brands.find((b) => b.id === id);
//     if (!brand) return;

//     const updatedStatus = brand.status === "active" ? "inactive" : "active";
//     const updatedBrand = { name: brand.name, status: updatedStatus };

//     try {
//       await axios.put(`${API_URL}/${id}`, updatedBrand, axiosConfig);
//       setBrands((prev) =>
//         prev.map((b) => (b.id === id ? { ...b, status: updatedStatus } : b))
//       );
//       showSuccessToast(`Status updated to ${updatedStatus}`);
//       showAlert(`Status updated ${updatedStatus}`, "success");
//     } catch (error) {
//       console.error("Status toggle failed:", error);
//       if (error.response?.status === 401) {
//         handleUnauthorized();
//       } else {
//         showAlert("Failed to update status", "error");
//         toast.error("Failed to toggle status");
//       }
//     }
//   };

//   const openCreateForm = () => {
//     setEditId(null);
//     setFormData({ name: "", status: "active" });
//     setErrors({});
//     setShowForm(true);
//   };

//   const openEditForm = (id) => {
//     const brand = brands.find((b) => b.id === id);
//     if (!brand) return;
//     setEditId(id);
//     setFormData({ name: brand.name, status: brand.status });
//     setErrors({});
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       // showAlert("Please fix the form errors", "error");
//       return;
//     }

//     try {
//       if (editId !== null) {
//         await axios.put(`${API_URL}/${editId}`, formData, axiosConfig);
//         showSuccessToast("Updated successfully");
//         showAlert("Updated successfully", "success");
//       } else {
//         await axios.post(API_URL, formData, axiosConfig);
//         showSuccessToast("Created successfully");
//         showAlert("Created successfully", "success");
//       }
//       setShowForm(false);
//       const res = await axios.get(API_URL, axiosConfig);
//       setBrands(res.data.data || []);
//     } catch (error) {
//       console.error("Save failed:", error);
//       if (error.response?.status === 401) {
//         handleUnauthorized();
//       } else {
//         showAlert(error.response?.data?.message || "Failed to save brand", "error");
//         toast.error(error.response?.data?.message || "Failed to save brand");
//       }
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const closeModal = () => {
//     setShowForm(false);
//     setFormData({ name: "", status: "active" });
//     setErrors({});
//     setEditId(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="font-poppins p-4">
//       <div className="fixed top-4 right-4 z-50 w-80">
//         {alert && (
//           <Alert
//             message={alert.message}
//             type={alert.type}
//             onClose={() => setAlert(null)}
//           />
//         )}
//       </div>

//       <div className="p-4 bg-white shadow rounded-lg">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//           <button
//             onClick={openCreateForm}
//             className="px-5 py-2 bg-cyan-800 text-white text-sm rounded-lg hover:bg-cyan-700"
//           >
//             Create
//           </button>

//           <div className="flex flex-wrap items-center gap-3 justify-end w-full md:w-auto">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-3 py-1.5 border border-cyan-700 rounded text-sm w-full md:w-64"
//             />
//             <div className="flex items-center gap-1">
//               <label className="text-sm text-gray-600">Show</label>
//               <select
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//                 className="border border-cyan-700 rounded px-2 py-1 text-sm"
//               >
//                 {[10, 20, 30, 40, 50].map((count) => (
//                   <option key={count} value={count}>
//                     {count}
//                   </option>
//                 ))}
//               </select>
//               <span className="text-sm text-gray-600">items</span>
//             </div>
//           </div>
//         </div>

//         <BrandModal
//           showForm={showForm}
//           closeModal={closeModal}
//           formData={formData}
//           setFormData={setFormData}
//           errors={errors}
//           editId={editId}
//           handleSave={handleSave}
//         />

//         <BrandTable
//           currentData={currentData}
//           startIndex={startIndex}
//           toggleStatus={toggleStatus}
//           openEditForm={openEditForm}
//           handleDelete={handleDelete}
//         />

//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           startIndex={startIndex}
//           itemsPerPage={itemsPerPage}
//           filteredData={filteredData}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </div>
//   );
// }

// export default Brand;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BrandModal from "./components/BrandModal";
import BrandTable from "./components/BrandTable";
import Pagination from "./components/Pagination";
import Loading from "./components/Loading";
import Alert from "./components/Alert";

// ✅ Use API URL from .env
const API_URL = `${import.meta.env.VITE_API_URL}/admin/brand`;
const MIN_LOADING_TIME = 1000;

function Brand() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", status: "active" });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [minimumLoadingDone, setMinimumLoadingDone] = useState(false);
  const [alert, setAlert] = useState(null);

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const showAlert = (message, type = 'success', duration = 3000) => {
    setAlert({ message, type });
    if (duration) {
      setTimeout(() => setAlert(null), duration);
    }
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: '#4BB543',
        color: '#fff',
      },
      icon: '✅',
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    let loadingTimer;

    const fetchBrands = async () => {
      try {
        loadingTimer = setTimeout(() => {
          setMinimumLoadingDone(true);
        }, MIN_LOADING_TIME);

        const res = await axios.get(API_URL, axiosConfig);
        setBrands(res.data.data || []);

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

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch brands:", error);

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

        setIsLoading(false);
        setLoadingFailed(true);
        if (error.response?.status === 401) {
          handleUnauthorized();
        } else {
          showAlert("Failed to fetch brands", "error");
          toast.error(" Failed to fetch brands");
        }
      } finally {
        clearTimeout(loadingTimer);
      }
    };

    fetchBrands();

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [token, navigate, minimumLoadingDone]);

  const handleUnauthorized = () => {
    showAlert("Session expired. Please login again.", "error");
    toast.error("Session expired. Please login again.", {
      position: "top-center",
      autoClose: 3000,
    });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredData = brands.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      showSuccessToast("Deleted successfully");
      showAlert("Deleted successfully", "success");
      setBrands(brands.filter(brand => brand.id !== id));
      if ((currentPage - 1) * itemsPerPage >= filteredData.length - 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Delete failed:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        showAlert("Failed to delete brand", "error");
        toast.error("Failed to delete brand");
      }
    }
  };

  const toggleStatus = async (id) => {
    const brand = brands.find((b) => b.id === id);
    if (!brand) return;

    const updatedStatus = brand.status === "active" ? "inactive" : "active";
    const updatedBrand = { name: brand.name, status: updatedStatus };

    try {
      await axios.put(`${API_URL}/${id}`, updatedBrand, axiosConfig);
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: updatedStatus } : b))
      );
      showSuccessToast(`Status updated to ${updatedStatus}`);
      showAlert(`Status updated ${updatedStatus}`, "success");
    } catch (error) {
      console.error("Status toggle failed:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        showAlert("Failed to update status", "error");
        toast.error("Failed to toggle status");
      }
    }
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

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editId !== null) {
        await axios.put(`${API_URL}/${editId}`, formData, axiosConfig);
        showSuccessToast("Updated successfully");
        showAlert("Updated successfully", "success");
      } else {
        await axios.post(API_URL, formData, axiosConfig);
        showSuccessToast("Created successfully");
        showAlert("Created successfully", "success");
      }
      setShowForm(false);
      const res = await axios.get(API_URL, axiosConfig);
      setBrands(res.data.data || []);
    } catch (error) {
      console.error("Save failed:", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      } else {
        showAlert(error.response?.data?.message || "Failed to save brand", "error");
        toast.error(error.response?.data?.message || "Failed to save brand");
      }
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const closeModal = () => {
    setShowForm(false);
    setFormData({ name: "", status: "active" });
    setErrors({});
    setEditId(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="font-poppins p-4">
      <div className="fixed top-4 right-4 z-50 w-80">
        {alert && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </div>

      <div className="p-4 bg-white shadow rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <button
            onClick={openCreateForm}
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
                onChange={handleItemsPerPageChange}
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

        <BrandModal
          showForm={showForm}
          closeModal={closeModal}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          editId={editId}
          handleSave={handleSave}
        />

        <BrandTable
          currentData={currentData}
          startIndex={startIndex}
          toggleStatus={toggleStatus}
          openEditForm={openEditForm}
          handleDelete={handleDelete}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          filteredData={filteredData}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default Brand;
