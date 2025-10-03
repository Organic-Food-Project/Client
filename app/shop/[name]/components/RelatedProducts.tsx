import React from 'react';
import Product from '@/components/Product';
import { ProductData } from '@/types/global';

interface RelatedProductsProps {
  productData: ProductData[];
  productId: string;
}
const RelatedProducts: React.FC<RelatedProductsProps> = async ({
  productData,
  productId,
}) => {
  return (
    <div className="pt-[100px]">
      <div className="flex justify-center items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-bold">
          Related Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[0, 1, 2, 3].map((i) =>
          productData?.filter((el: { _id: string }) => el._id !== productId)?.[
            i
          ] ? (
            <Product
              img={productData?.[i]?.images?.[0]}
              description={productData?.[i].description}
              name={productData?.[i].name}
              price={productData?.[i].price}
              rate={productData?.[i].rate}
              quantity={productData?.[i].quantity}
              key={productData?.[i]?._id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
