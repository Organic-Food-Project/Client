import React from 'react';
import { LoadingProduct } from '@/components/Product';

const RelatedProductsSkeleton = () => {
  return (
    <div className="pt-[100px]">
      <div className="flex justify-center items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-bold">
          Related Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
        <LoadingProduct />
      </div>
    </div>
  );
};

export default RelatedProductsSkeleton;
