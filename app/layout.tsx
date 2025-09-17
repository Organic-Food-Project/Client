import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import ScrollToTop from '@/components/ScrollToTop';
import { Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: {
    default: 'Organic Food',
    template: '%s | Organic Food',
  },
  description:
    'Discover fresh and healthy organic food products made with natural ingredients. Shop organic fruits, vegetables, and eco-friendly groceries online.',

  keywords: [
    'organic food',
    'healthy groceries',
    'natural products',
    'sustainable food',
    'organic fruits',
    'organic vegetables',
    'eco-friendly store',
  ],

  openGraph: {
    title: 'Organic Food Store',
    description:
      'Buy fresh, natural, and sustainable organic food products online. Healthy groceries, organic fruits, vegetables, and eco-friendly choices delivered to your door.',
    url: 'https://organicfood-client.vercel.app',
    siteName: 'Organic Food Store',
    images: [
      {
        url: 'https://organicfood-client.vercel.app/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Fresh Organic Food Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Organic Food Store',
    description:
      'Shop fresh, healthy, and sustainable organic food online. Enjoy natural groceries, fruits, vegetables, and eco-friendly products.',
    images: ['https://organicfood-client.vercel.app/Logo.png'],
  },

  alternates: {
    canonical: 'https://organicfood-client.vercel.app',
  },
};

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <BreadCrumbs />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
