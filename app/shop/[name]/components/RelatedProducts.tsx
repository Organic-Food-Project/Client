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
  const filterdProducts =
    productData?.filter((el: { _id: string }) => el._id !== productId) || [];

  if (filterdProducts?.length === 0) return null;
  return (
    <div className="pt-[100px]">
      <div className="flex justify-center items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-bold">
          Related Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[0, 1, 2, 3].map((i) =>
          filterdProducts?.[i] ? (
            <Product
              _id={filterdProducts?.[i]?._id}
              images={filterdProducts?.[i]?.images}
              category={filterdProducts?.[i]?.category}
              feedBack={filterdProducts?.[i]?.feedBack}
              description={filterdProducts?.[i].description}
              name={filterdProducts?.[i].name}
              price={filterdProducts?.[i].price}
              rate={filterdProducts?.[i].rate}
              quantity={filterdProducts?.[i].quantity}
              inWishlist={filterdProducts?.[i]?.inWishlist ?? false}
              key={filterdProducts?.[i]?._id}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
