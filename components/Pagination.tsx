'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const Pagination = () => {
  const currentPage: number = 1;
  const paginationData = {
    last_page: 10,
    current_page: 1,
  };

  const goToPage = (number: number) => {
    console.log({ number });
  };

  return (
    <div className="flex items-center justify-center pt-[40px]">
      <div className="flex">
        <div className="flex justify-center items-center space-x-2 mx-3">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
            className="cursor-pointer disabled:cursor-not-allowed px-2 py-2 rounded-full cursor-pointer disabled:text-gray-300 disabled:bg-gray-50 text-gray-900 bg-white border-[2px] border-gray-100"
          >
            <ChevronLeft />
          </button>
          {currentPage > 3 && (
            <>
              <button
                onClick={() => goToPage(1)}
                className="px-4 py-2 text-gray-600 rounded-full duration-100 hover:text-white hover:bg-primary cursor-pointer"
              >
                1
              </button>
              {currentPage > 3 && <span>...</span>}
            </>
          )}

          {Array.from({ length: 5 }, (_, i) => {
            const pageNumber = currentPage - 2 + i;
            if (pageNumber > 0 && pageNumber <= paginationData?.last_page) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`px-4 py-2 text-gray-600 rounded-full duration-100 hover:text-white hover:bg-primary cursor-pointer ${
                    currentPage === pageNumber ? 'bg-primary text-white' : ''
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {currentPage < paginationData?.last_page - 2 && (
            <>
              {currentPage < paginationData?.last_page - 3 && <span>...</span>}
              <button
                onClick={() => goToPage(paginationData?.last_page)}
                className="px-3 py-2 text-gray-600 rounded-full duration-100 hover:text-white hover:bg-primary cursor-pointer"
              >
                {paginationData?.last_page}
              </button>
            </>
          )}
          <button
            onClick={() => goToPage(paginationData?.last_page)}
            className="cursor-pointer disabled:cursor-not-allowed px-2 py-2 rounded-full cursor-pointer disabled:text-gray-300 disabled:bg-gray-50 text-gray-900 bg-white border-[2px] border-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
