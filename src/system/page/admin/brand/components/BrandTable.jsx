import { Edit, Trash2 } from "lucide-react";

export default function BrandTable({
  currentData,
  startIndex,
  toggleStatus,
  openEditForm,
  handleDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs border border-cyan-600 rounded overflow-hidden font-poppins">
        <thead className="bg-cyan-800 text-white">
          <tr>
            <th className="px-3 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {currentData.length > 0 ? (
            currentData.map((b, i) => (
              <tr
                key={b.id}
                className="border-b odd:bg-white hover:bg-cyan-100"
              >
                <td className="px-3 py-2">{startIndex + i + 1}</td>
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleStatus(b.id)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      b.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {b.status === "active" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button onClick={() => openEditForm(b.id)} title="Edit">
                    <Edit
                      size={16}
                      className="text-cyan-800 hover:text-cyan-800"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    title="Delete"
                  >
                    <Trash2
                      size={16}
                      className="text-red-800 hover:text-red-800"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4">
                No matching results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}