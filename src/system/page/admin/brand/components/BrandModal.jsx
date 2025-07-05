export default function BrandModal({
  showForm,
  closeModal,
  formData,
  setFormData,
  errors,
  editId,
  handleSave,
}) {
  if (!showForm) return null;

  return (
    <div
      id="modalOverlay"
      onClick={(e) => e.target.id === "modalOverlay" && closeModal()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        className="bg-white p-6 rounded-xl border w-full max-w-md shadow-lg relative font-poppins"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &#x2715;
        </button>

        <h2 className="text-xl mb-5 text-cyan-800">
          {editId !== null ? "Update Brand" : "Create Brand"}
        </h2>

        <div className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  const newErrors = { ...errors };
                  delete newErrors.name;
                  setErrors(newErrors);
                }
              }}
              className={`mt-1 px-3 py-2 border rounded w-full ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter brand name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-700"
          >
            {editId !== null ? "Update" : "Save"}
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}



// import Alert from "./Alert";

// export default function BrandModal({
//   showForm,
//   closeModal,
//   formData,
//   setFormData,
//   errors,
//   editId,
//   handleSave,
// }) {
//   if (!showForm) return null;

//   return (
//     <div
//       id="modalOverlay"
//       onClick={(e) => e.target.id === "modalOverlay" && closeModal()}
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//     >
//       <div
//         className="bg-white p-6 rounded-xl border w-full max-w-md shadow-lg relative font-poppins"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           onClick={closeModal}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           &#x2715;
//         </button>

//         <h2 className="text-xl mb-5 text-cyan-800">
//           {editId !== null ? "Update Brand" : "Create Brand"}
//         </h2>

//         {Object.keys(errors).length > 0 && (
//           <div className="mb-4">
//             <Alert
//               message="Please fix the errors below"
//               type="error"
//             />
//           </div>
//         )}

//         <div className="space-y-4 text-sm">
//           <div>
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => {
//                 setFormData({ ...formData, name: e.target.value });
//                 if (errors.name) {
//                   const newErrors = { ...errors };
//                   delete newErrors.name;
//                   setErrors(newErrors);
//                 }
//               }}
//               className={`mt-1 px-3 py-2 border rounded w-full ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter brand name"
//             />
//             {errors.name && (
//               <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Status</label>
//             <select
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value })
//               }
//               className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={handleSave}
//             className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-700"
//           >
//             {editId !== null ? "Update" : "Save"}
//           </button>
//           <button
//             onClick={closeModal}
//             className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }