import React from 'react';
import type { Metadata } from 'next';
import Query from '@/lib/Query';
import { redirect } from 'next/navigation';
import FeedBack from './components/FeedBack';
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
    <div>
      <ProductInfo productData={product.data.data} />
      <FeedBack reviews={reviews ?? product.data.data?.feedBack} />
      <RelatedProducts productData={product.data.data} />
    </div>
  );
};

export default ProductPage;
