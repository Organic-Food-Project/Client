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
  if (
    productData?.filter((el: { _id: string }) => el._id !== productId)
      ?.length === 0
  )
    return null;
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
              _id={productData?.[i]?._id}
              images={productData?.[i]?.images}
              category={productData?.[i]?.category}
              feedBack={productData?.[i]?.feedBack}
              description={productData?.[i].description}
              name={productData?.[i].name}
              price={productData?.[i].price}
              rate={productData?.[i].rate?.avg}
              quantity={productData?.[i].quantity}
              inWishlist={productData?.[i]?.inWishlist ?? false}
              key={productData?.[i]?._id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
