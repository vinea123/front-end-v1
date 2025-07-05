export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  filteredData,
  setCurrentPage,
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  
  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
      <div className="text-gray-600">
        Showing {filteredData.length === 0 ? 0 : startIndex + 1} to{" "}
        {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-300 border-gray-300"
              : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
          }`}
        >
          First
        </button>
        
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-300 border-gray-300"
              : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
          .map((page, i, arr) => {
            const prev = arr[i - 1];
            return [
              prev && page - prev > 1 ? (
                <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>
              ) : null,
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-cyan-700 text-white border-cyan-700"
                    : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
                }`}
              >
                {page}
              </button>
            ];
          })}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded border ${
            currentPage === totalPages
              ? "text-gray-300 border-gray-300"
              : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
          }`}
        >
          Next
        </button>
        
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded border ${
            currentPage === totalPages
              ? "text-gray-300 border-gray-300"
              : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
          }`}
        >
          Last
        </button>
      </div>
    </div>
  );
}