export default function BrandModal({
  showForm,
  onClose,
  formData,
  setFormData,
  errors,
  setErrors,
  editId,
  onSave,
}) {
  if (!showForm) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl border w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          &#x2715;
        </button>

        <h2 className="text-xl mb-5 text-cyan-800">
          {editId !== null ? "Update Brand" : "Create Brand"}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700">
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
              className={`mt-1 px-3 text-sm py-2 border rounded w-full ${
                errors.name ? "border-red-800" : "border-gray-300"
              }`}
              placeholder="Enter brand name"
            />
            {errors.name && (
              <p className="text-red-800 text-sm mt-1">{errors.name}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onSave}
            className="px-5 py-2 bg-cyan-800 text-white text-sm rounded hover:bg-cyan-700"
          >
            {editId !== null ? "Update" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}