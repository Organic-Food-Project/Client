import Pagination from '@/app/components/Pagination';
import Product, { LoadingProduct } from '@/app/components/Product';
import FiltersSection from '@/app/shop/components/FiltersSection';
import SingleSelect from '@/app/components/ui/select';
import React, { Suspense } from 'react';
import Query from '@/lib/Query';
import FiltersSectionLoading from './components/FiltersSectionLoading';

const Shop = () => {
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'price', label: 'Price - (low to hight)' },
    { value: '-price', label: 'Price - (hight to low)' },
    { value: 'rating', label: 'Rating - (low to hight)' },
    { value: '-rating', label: 'Rating - (hight to low)' },
  ];

  const metaData = {
    total: 100,
    limit: 15,
  };
  return (
    <>
      <div className="flex max-lg:flex-col gap-6 pt-6">
        <div className="min-w-[250px]">
          <Suspense fallback={<FiltersSectionLoading />}>
            <AllCategories />
          </Suspense>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col flex-grow text-center">
            <div className="sm:h-[45px] mb-[24px] flex justify-between items-center flex-wrap gap-2">
              <div className="text-bodu-small text-gray-500 flex items-center flex-wrap gap-2">
                <span>Sort by:</span>
                <SingleSelect className="w-[250px]" options={sortOptions} />
              </div>
              <div className="text-body-medium text-gray-600">
                <span className="text-gray-900 font-bold">52</span> Results
                Found
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 ">
              <Suspense fallback={<ProductsLoading />}>
                <AllProducts />
              </Suspense>
            </div>
          </div>
          <Pagination metaData={metaData} />
        </div>
      </div>
    </>
  );
};

const AllProducts = async () => {
  const products = await Query({ api: 'v1/products' });
  if (products.error) return products.error;
  return (
    <>
      {products.data?.data.map(
        (el: {
          id: string;
          description: string;
          name: string;
          price: number;
          rate: number;
          quantity: number;
        }) => (
          <Product
            description={el.description}
            name={el.name}
            price={el.price}
            rate={el.rate}
            quantity={el.quantity}
            key={el.id}
          />
        )
      )}
    </>
  );
};
const AllCategories = async () => {
  const categories = await Query({ api: 'v1/categories' });
  if (categories.error) return categories.error;
  return (
    <FiltersSection
      categories={categories.data?.data.map(
        (el: { name: string; id: string; products: string[] }) => ({
          name: el.name,
          id: el.id,
          count: el.products.length,
        })
      )}
    />
  );
};

const ProductsLoading = () => {
  const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <>
      {products.map((el) => (
        <LoadingProduct key={el} />
      ))}
    </>
  );
};

export default Shop;
