import React from 'react';
import type { Metadata } from 'next';
import Query from '@/lib/Query';
import { redirect } from 'next/navigation';
import Middle from './components/Middle';
import RelatedProducts from './components/RelatedProducts';
import ProductInfo from './components/ProductInfo';

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
  const product = await Query({
    api: `v1/products/${productName}`,
  });

  if (product.error) {
    redirect('/shop');
  }

  console.log({ data: product.data.data });

  return (
    <div>
      <ProductInfo productData={product.data.data} />
      <Middle productData={product.data.data} />
      <RelatedProducts productData={product.data.data} />
    </div>
  );
};

export default ProductPage;
