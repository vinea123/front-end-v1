import PropTypes from "prop-types";

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};
function Pagination({ currentPage, totalPages, totalItems, startIndex, itemsPerPage, goToPage }) {
  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-2 text-sm">
      <div className="text-gray-600">
        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
      </div>
      <div className="flex items-center space-x-1">
        <button
          onClick={() => goToPage(1)}
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
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-300 border-gray-300"
              : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
          }`}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-cyan-700 text-white border-cyan-700"
                    : "text-cyan-700 border-cyan-700 hover:bg-cyan-100"
                }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={page} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          return null;
        })}
        <button
          onClick={() => goToPage(currentPage + 1)}
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
          onClick={() => goToPage(totalPages)}
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



export default Pagination;