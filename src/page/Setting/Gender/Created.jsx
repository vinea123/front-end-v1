function Create() {
  return (
    <>
    {showForm && (
          <div className="bg-cyan-50 p-4 rounded border border-cyan-200 mb-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {["name", "title", "company", "role", "username"].map((field) => (
                <div key={field}>
                  <label className="text-sm capitalize">{field}</label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    placeholder={`Enter ${field}`}
                    className="mt-1 w-full px-3 py-2 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="px-3 py-1.5 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormData({ name: "", title: "", company: "", role: "", username: "" });
                }}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </>
  );
}

export default Create;
