/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from '@/components/Pagination';
import Product, { LoadingProduct } from '@/components/Product';
import FiltersSection from '@/app/shop/components/FiltersSection';
import React, { Suspense } from 'react';
import Query from '@/lib/Query';
import FiltersSectionLoading from './components/FiltersSectionLoading';
import { ProductData } from '@/types/global';
import Header from './components/Header';

const Shop = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const filters = await searchParams;

  const productsPromise: Promise<{ data: any | null; error: any | null }> =
    Query({
      api: 'v1/products',
      filters: {
        ...filters,
        limit: '9',
      },
    });

  const categoriesPromise: Promise<{ data: any | null; error: any | null }> =
    Query({
      api: 'v1/categories?limit=200',
    });

  return (
    <div className="flex max-lg:flex-col gap-6 pt-6">
      <div className="min-w-[250px]">
        <Suspense fallback={<FiltersSectionLoading />}>
          <AllCategories promise={categoriesPromise} />
        </Suspense>
      </div>
      <div className="flex flex-col flex-grow">
        <Suspense fallback={<ProductsLoading />}>
          <AllProducts promise={productsPromise} />
        </Suspense>
      </div>
    </div>
  );
};

const AllProducts = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const products = await promise;

  if (products?.error) return products.error;

  return (
    <div className="flex flex-col flex-grow text-center">
      <Header meta={products?.data?.meta} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {products?.data?.data?.length > 0 ? (
          products?.data?.data?.map((el: ProductData) => (
            <Product
              _id={el?._id}
              images={el?.images}
              description={el.description}
              name={el.name}
              price={el.price}
              rate={el.rate}
              quantity={el.quantity}
              key={el._id}
              category={el.category}
              feedBack={el.feedBack}
              inWishlist={el.inWishlist ?? false}
            />
          ))
        ) : (
          <div className="col-span-3 flex items-center justify-center flex-col bg-white w-full h-[300px] text-center text-body-large">
            <div>👀</div>
            No Products to display
          </div>
        )}
      </div>
      {products?.data?.data?.length > 0 && (
        <Suspense>
          <Pagination metaData={products?.data?.meta} />
        </Suspense>
      )}
    </div>
  );
};

const AllCategories = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const categories = await promise;

  if (categories?.error) return categories.error;

  return (
    <FiltersSection
      categories={categories?.data?.data?.map(
        (el: { name: string; _id: string; products: string[] }) => ({
          name: el.name,
          id: el._id,
          count: el.products.length,
        })
      )}
    />
  );
};

const ProductsLoading = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="flex flex-col flex-grow text-center">
      <div className="flex max-sm:flex-col gap-4 flex-grow pb-4">
        <div className="max-sm:w-full text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
          <label htmlFor="search">Search: </label>
          <span className="bg-gray-100 animate-pulse block w-[250px] h-[36px]" />
        </div>
        <div className="max-sm:w-full text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
          <span>Sort by:</span>
          <span className="bg-gray-100 animate-pulse block w-[250px] h-[36px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
        {products.map((el) => (
          <LoadingProduct key={el} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
