export default function RolesModal({
  showForm,
  closeForm,
  formData,
  setFormData,
  errors,
  editId,
  saving,
  handleSave,
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={closeForm}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {editId !== null ? "Update Role" : "Create Role"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ name: e.target.value });
              if (errors.name) setErrors({});
            }}
            className="w-full border px-3 py-2 rounded text-sm focus:ring-2 focus:ring-cyan-500"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
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
  );
}