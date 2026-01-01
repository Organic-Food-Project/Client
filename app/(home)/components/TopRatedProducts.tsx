/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight } from 'lucide-react';
import React from 'react';
import Product, { LoadingProduct } from '@/components/Product';
import Vig1 from '@/assets/Vig1.webp';
import Image from 'next/image';
import Query from '@/lib/Query';
import { Suspense } from 'react';
import { ProductData } from '@/types/global';
import CustomLink from '@/components/CustomLink';

const TopRatedProducts = async () => {
  const productsPromise: Promise<{ data: any | null; error: any | null }> =
    Query({
      api: 'v1/products?sort=-rate&limit=4',
    });

  return (
    <div className="mainPadding">
      <div className="flex justify-between items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03  font-bold">
          Top Rated Products
        </h2>{' '}
        <CustomLink
          href="/shop?sort=-rate"
          className=" text-primary pb-2 flex gap-2"
        >
          View All
          <ArrowRight />
        </CustomLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<ProductsLoading />}>
          <AllProducts promise={productsPromise} />
        </Suspense>
      </div>
      <Image
        src={Vig1}
        width={144}
        height={434}
        alt="Vig1"
        className="absolute bottom-0 left-0 z-[-1]"
      />
    </div>
  );
};

const AllProducts = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const products = await promise;

  if (products?.error) {
    return products.error;
  }

  return (
    <>
      {products?.data?.data?.map((el: ProductData) => (
        <Product
          _id={el?._id}
          images={el?.images}
          category={el?.category}
          feedBack={el?.feedBack}
          description={el?.description}
          name={el?.name}
          price={el?.price}
          rate={el?.rate}
          quantity={el?.quantity}
          inWishlist={el?.inWishlist ?? false}
          key={el?._id}
        />
      ))}
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

export default TopRatedProducts;
