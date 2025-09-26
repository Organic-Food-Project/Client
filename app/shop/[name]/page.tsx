import React from 'react';
import type { Metadata } from 'next';
import Query from '@/lib/Query';
import { redirect } from 'next/navigation';

interface ProductPageProps {
  params: {
    name: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const productName = params.name.replace('%20', ' ');

  return {
    title: productName,
    description: productName,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const productName = params.name.replace('%20', ' ');
  const product = await Query({
    api: `v1/products/${productName}`,
  });

  if (product.error) {
    redirect('/shop');
  }
  return <div>{productName}</div>;
};

export default ProductPage;
