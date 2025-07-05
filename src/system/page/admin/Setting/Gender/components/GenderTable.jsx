import { Edit, Trash2 } from "lucide-react";

export default function GenderTable({
  currentData,
  startIndex,
  openEditForm,
  handleDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs border border-cyan-600 rounded overflow-hidden font-poppins">
        <thead className="bg-cyan-800 text-white">
          <tr>
            <th className="text-left px-3 py-2">No</th>
            <th className="text-left px-3 py-2">Name</th>
            <th className="text-center px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length ? (
            currentData.map((g, i) => (
              <tr key={g.id} className="hover:bg-cyan-50 border-b">
                <td className="px-3 py-2">{startIndex + i + 1}</td>
                <td className="px-3 py-2">{g.name}</td>
                <td className="px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => openEditForm(g)}
                    className="text-cyan-800 hover:text-cyan-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-800 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center px-4 py-4 text-gray-500">
                No matching records.
              </td>
            </tr>   
          )}
        </tbody>
      </table>
    </div>
  );
}