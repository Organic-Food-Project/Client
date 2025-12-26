'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { MetaData } from '@/types/global';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  metaData: MetaData;
}

const Pagination: React.FC<PaginationProps> = ({ metaData }) => {
  const searchParams = useSearchParams();
  const currentPage: number = Number(searchParams.get('page') ?? 1);
  const lastPage: number = Math.ceil(metaData?.total / metaData?.limit) ?? 10;
  const router = useRouter();
  const pathname = usePathname();

  const goToPage = (number: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (number) {
      params.set('page', String(number));
    } else {
      params.delete('page');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center pt-[40px]">
      <div className="flex">
        <div className="flex justify-center items-center space-x-2 mx-3">
          <button
            aria-label="Go to previous page"
            disabled={currentPage === 1}
            onClick={() => goToPage(1)}
            className="cursor-pointer disabled:cursor-not-allowed px-2 py-2 rounded-full  disabled:text-gray-300 disabled:bg-gray-50 text-gray-900 bg-white border-[2px] border-gray-100"
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
            if (pageNumber > 0 && pageNumber <= lastPage) {
              return (
                <button
                  key={pageNumber}
                  disabled={currentPage === pageNumber}
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

          {currentPage < lastPage - 2 && (
            <>
              {currentPage < lastPage - 3 && <span>...</span>}
              <button
                onClick={() => goToPage(lastPage)}
                className="px-3 py-2 text-gray-600 rounded-full duration-100 hover:text-white hover:bg-primary cursor-pointer"
              >
                {lastPage}
              </button>
            </>
          )}
          <button
            aria-label="Go to next page"
            onClick={() => goToPage(lastPage)}
            disabled={currentPage === lastPage}
            className="disabled:cursor-not-allowed px-2 py-2 rounded-full cursor-pointer disabled:text-gray-300 disabled:bg-gray-50 text-gray-900 bg-white border-[2px] border-gray-100"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
