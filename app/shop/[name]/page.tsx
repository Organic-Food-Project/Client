import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Query from '@/lib/Query';
import { redirect } from 'next/navigation';
import FeedBack from './components/FeedBack';
import RelatedProducts from './components/RelatedProducts';
import ProductInfo from './components/ProductInfo';
import ProductInfoSkeleton from './components/Skeletons/ProductInfoSkeleton';
import FeedBackSkeleton from './components/Skeletons/FeedBackSkeleton';
import RelatedProductsSkeleton from './components/Skeletons/RelatedProductsSkeleton';

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
  console.log({
    product: product.data.data,
    relatedProducts: relatedProducts.data.data,
  });

  if (product.error) {
    redirect('/shop');
  }

  const reviews = [
    {
      id: '1',
      name: 'Kristin Watson',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-avatar-2-2S9MTiT3jlT3ttEmEDarJoCXUM40ok.png',
      rating: 5,
      comment: 'Duis at ullamcorper nulla, eu dictum eros.',
      date: '2 min ago',
    },
    {
      id: '2',
      name: 'Jane Cooper',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-avatar-2-2S9MTiT3jlT3ttEmEDarJoCXUM40ok.png',
      rating: 4,
      comment:
        "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to 'bolt' or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
      date: '30 Apr, 2021',
    },
    {
      id: '3',
      name: 'Jacob Jones',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-avatar-2-2S9MTiT3jlT3ttEmEDarJoCXUM40ok.png',
      rating: 5,
      comment:
        'Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.',
      date: '2 min ago',
    },
    {
      id: '4',
      name: 'Ralph Edwards',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-avatar-2-2S9MTiT3jlT3ttEmEDarJoCXUM40ok.png',
      rating: 5,
      comment:
        "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
      date: '2 min ago',
    },
    {
      id: '5',
      name: 'Kristin Watson',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/man-avatar-2-2S9MTiT3jlT3ttEmEDarJoCXUM40ok.png',
      rating: 5,
      comment: 'Duis at ullamcorper nulla, eu dictum eros.',
      date: '2 min ago',
    },
  ];

  return (
    <>
      <ProductInfo productData={product.data.data} />
      <FeedBack reviews={reviews} productData={product.data.data} />
      <RelatedProducts
        productData={relatedProducts.data.data}
        productId={product.data?.data?._id}
      />
    </>
  );
};

export default ProductPage;
