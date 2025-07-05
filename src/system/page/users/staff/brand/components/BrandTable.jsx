import { Edit, Trash2 } from "lucide-react";

export default function BrandTable({ currentData, startIndex, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto font-poppins">
      <table className="min-w-full text-xs border border-cyan-800 rounded overflow-hidden">
        <thead className="bg-cyan-800 text-white">
          <tr>
            <th className="px-3 py-2 text-left">No</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {currentData.length > 0 ? (
            currentData.map((b, i) => (
              <tr key={b.id} className="border-b odd:bg-white hover:bg-cyan-100">
                <td className="px-3 py-2">{startIndex + i + 1}</td>
                <td className="px-4 py-2">{b.name}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button onClick={() => onEdit(b.id)} title="Edit">
                    <Edit size={16} className="text-cyan-800 hover:text-cyan-800" />
                  </button>
                  <button onClick={() => onDelete(b.id)} title="Delete">
                    <Trash2 size={16} className="text-red-800 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-4">
                No matching results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}