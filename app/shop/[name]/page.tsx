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
  const title = params.name.replace('-', ' ');
  const productName = title.charAt(0).toUpperCase() + title.slice(1);

  return {
    title: productName,
    description: productName,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const productName = params.name.replace('-', ' ');

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
        <GetProduct productName={productName} />
      </Suspense>
    </div>
  );
};

const GetProduct = async ({ productName }: { productName: string }) => {
  const product = await Query({
    api: `v1/products/${productName}`,
  });
  const relatedProducts = await Query({
    api: `v1/products?category=${product.data?.data?.category._id}`,
  });

  const cookieStore = await cookies();
  const hasToken = !!cookieStore.get('token')?.value;

  if (product.error) {
    redirect('/shop');
  }

  return (
    <>
      <Product productData={product.data.data} />
      <FeedBack
        productId={product.data.data?._id}
        allReviews={product?.data?.data?.feedBack ?? []}
        hasToken={hasToken}
      />
      <RelatedProducts
        productData={relatedProducts.data.data}
        productId={product.data?.data?._id}
      />
    </>
  );
};

export default ProductPage;
