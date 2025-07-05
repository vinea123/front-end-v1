import { Edit, Trash2 } from "lucide-react";

export default function GenderModal({
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
        <h2 className="text-xl mb-5 text-cyan-800">
          {editId !== null ? "Update Gender" : "Create Gender"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm mb-1" htmlFor="gender-name">
            Name
          </label>
          <input
            id="gender-name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ name: e.target.value });
              if (errors.name) setErrors({});
            }}
            className="w-full border px-3 py-2 rounded text-sm"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-800 text-white text-sm px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
          >
            {editId !== null ? "Update" : "Save"}
          </button>
          <button
            onClick={closeForm}
            className="bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}