import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  data: Array<object>;
  count: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  data,
  count,
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  return (
    <div>
      <div className='flex justify-between items-center mt-4 w-full'>
        <div className='flex items-center space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) => page >= currentPage - 1 && page <= currentPage + 1
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-gray-300"
                } rounded-md`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            className='px-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100'
          >
            <FiChevronRight className='h-4 w-4' />
          </button>
        </div>
        <div>
          Exibindo {data.length} de {count} registros
        </div>
        <div className='flex items-center space-x-2'>
          <select
            className='border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary'
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
