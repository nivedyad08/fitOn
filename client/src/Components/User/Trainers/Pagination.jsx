import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="fixed bottom-0 right-24 flex items-center justify-center p-4 mb-12">
            <button
                onClick={ () => onPageChange(currentPage - 1) }
                disabled={ currentPage === 1 }
                className={ `px-6 py-10 text-sm font-medium text-white ${ currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                    } rounded-l-md` }
            >
                Previous
            </button>
            <span className="px-6 py-8 font-medium text-gray-600 bg-gray-200">
                Page { currentPage } of { totalPages }
            </span>
            <button
                onClick={ () => onPageChange(currentPage + 1) }
                disabled={ currentPage === totalPages }
                className={ `px-6 py-10 text-sm font-medium text-white ${ currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                    } rounded-r-md` }
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
