import React from 'react';
import Product, { LoadingProduct } from '@/components/Product';
import Query from '@/lib/Query';
import { Suspense } from 'react';

interface RelatedProductsProps {
  productData: {
    _id: string;
    category: {
      _id: string;
      name: string;
    };
  };
}
const RelatedProducts: React.FC<RelatedProductsProps> = async ({
  productData,
}) => {
  return (
    <div className="pt-[100px]">
      <div className="flex justify-center items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03 font-bold">
          Related Products
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<ProductsLoading />}>
          <AllProducts
            productId={productData._id}
            category={productData.category}
          />
        </Suspense>
      </div>
    </div>
  );
};

const AllProducts = async ({
  productId,
  category,
}: {
  productId: string;
  category: {
    _id: string;
    name: string;
  };
}) => {
  const products = await Query({
    api: `v1/products?category=${category._id}`,
  });

  if (products.error) {
    return products.error;
  }

  return (
    <>
      {[0, 1, 2, 3].map((i) =>
        products.data?.data?.filter(
          (el: { _id: string }) => el._id !== productId
        )?.[i] ? (
          <Product
            img={products.data?.data?.[i]?.images?.[0]}
            description={products.data?.data?.[i].description}
            name={products.data?.data?.[i].name}
            price={products.data?.data?.[i].price}
            rate={products.data?.data?.[i].rate}
            quantity={products.data?.data?.[i].quantity}
            key={products.data?.data?.[i]?._id}
          />
        ) : null
      )}
    </>
  );
};

const ProductsLoading = () => {
  return (
    <>
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct />
    </>
  );
};

export default RelatedProducts;
