import PropTypes from "prop-types";

function UserModal({ show, onClose, formData, setFormData, errors, genders, roles, editId, onSave, saving }) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-xl mb-5 text-cyan-800">{editId !== null ? "Update User" : "Create User"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          {["first_name", "last_name", "email"].map((field) => (
            <div key={field} className="mb-3">
              <label className="block text-sm mb-1 capitalize">{field.replace("_", " ")}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className={`w-full border text-sm px-3 py-2 rounded ${
                  errors[field] ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={`Enter ${field.replace("_", " ")}`}
              />
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
          <div className="mb-3">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full border text-sm px-3 py-2 rounded ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={editId !== null ? "Leave blank to keep current password" : "Enter password"}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Date of birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className={`w-full text-sm border px-3 py-2 rounded ${
                errors.dob ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full text-sm border px-3 py-2 rounded ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter address"
              rows={2}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Gender</label>
            <select
              value={formData.gender_id}
              onChange={(e) => setFormData({ ...formData, gender_id: e.target.value })}
              className={`w-full text-sm border px-3 py-2 rounded ${
                errors.gender_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Gender</option>
              {genders.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.gender_id && <p className="text-red-500 text-xs mt-1">{errors.gender_id}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-1">Role</label>
            <select
              value={formData.roles_id}
              onChange={(e) => setFormData({ ...formData, roles_id: e.target.value })}
              className={`w-full text-sm border px-3 py-2 rounded ${
                errors.roles_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.roles_id && <p className="text-red-500 text-xs mt-1">{errors.roles_id}</p>}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-cyan-800 text-white text-sm px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
            >
              {saving ? 'Processing...' : editId !== null ? 'Update' : 'Save'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UserModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  genders: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  editId: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default UserModal;