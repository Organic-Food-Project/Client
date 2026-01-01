/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Query from '@/lib/Query';
import { redirect } from 'next/navigation';
import FeedBack from './components/FeedBack';
import RelatedProducts from './components/RelatedProducts';
import ProductInfoSkeleton from './components/Skeletons/ProductInfoSkeleton';
import FeedBackSkeleton from './components/Skeletons/FeedBackSkeleton';
import RelatedProductsSkeleton from './components/Skeletons/RelatedProductsSkeleton';
import Product from './components/Proudct';
import { cookies } from 'next/headers';

interface ProductPageProps {
  params: {
    name: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const title = params.name.replaceAll('-', ' ');
  const productName = title.charAt(0).toUpperCase() + title.slice(1);

  return {
    title: productName,
    description: productName,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const productName = params.name.replaceAll('-', ' ');
  const productPromise: Promise<{ data: any | null; error: any | null }> =
    Query({
      api: `v1/products/${productName}`,
    });

  return (
    <div>
      <Suspense
        fallback={
          <>
            <ProductInfoSkeleton />
            <FeedBackSkeleton />
            <RelatedProductsSkeleton />
          </>
        }
      >
        <GetProduct promise={productPromise} />
      </Suspense>
    </div>
  );
};

const GetProduct = async ({
  promise,
}: {
  promise: Promise<{ data: any | null; error: any | null }>;
}) => {
  const product = await promise;

  if (product?.error) {
    console.log(product?.error);
    redirect('/shop?sort=-rate');
  }

  const relatedProductsPromise: Promise<{
    data: any | null;
    error: any | null;
  }> = Query({
    api: `v1/products?filter[category]=${product?.data?.data?.category._id}`,
  });

  const relatedProducts = await relatedProductsPromise;

  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('token')?.value;

  return (
    <>
      <Product productData={product?.data?.data} />
      <FeedBack
        productId={product?.data?.data?._id}
        allReviews={product?.data?.data?.feedBack ?? []}
        hasToken={hasToken}
      />
      <RelatedProducts
        productData={relatedProducts?.data?.data}
        productId={product?.data?.data?._id}
      />
    </>
  );
};

export default ProductPage;
