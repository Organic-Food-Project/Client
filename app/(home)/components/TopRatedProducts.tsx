import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Product, { LoadingProduct } from '@/app/components/Product';
import Vig1 from '@/assets/Vig1.webp';
import Image from 'next/image';
import Query from '@/lib/Query';
import { Suspense } from 'react';

const TopRatedProducts = async () => {
  return (
    <div className="mainPadding">
      <div className="flex justify-between items-center pb-[40px]">
        <h2 className="text-4xl sm:text-heading-03  font-bold">
          Top Rated Products
        </h2>{' '}
        <Link href="/shop" className=" text-primary pb-2 flex gap-2">
          View All
          <ArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<ProductsLoading />}>
          <AllProducts />
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

const AllProducts = async () => {
  const products = await Query({
    api: 'v1/products/',
  });

  if (products.error) {
    return products.error;
  }
  return (
    <>
      {[0, 1, 2, 3].map((i) =>
        products.data?.data?.[i] ? (
          <Product
            description={products.data?.data?.[i].description}
            name={products.data?.data?.[i].name}
            price={products.data?.data?.[i].price}
            rate={products.data?.data?.[i].rate}
            quantity={products.data?.data?.[i].quantity}
            key={i}
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

export default TopRatedProducts;
