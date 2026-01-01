import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadCrumbs from '@/components/BreadCrumbs';
import ScrollToTop from '@/components/ScrollToTop';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NavigationProgress } from '@/components/CustomLink';

export const metadata: Metadata = {
  title: {
    default: 'EcoFila',
    template: '%s | EcoFila',
  },
  description:
    'Discover fresh and healthy organic food products made with natural ingredients. Shop organic fruits, vegetables, and eco-friendly groceries online.',

  keywords: [
    'EcoFila',
    'organic food',
    'healthy groceries',
    'natural products',
    'sustainable food',
    'organic fruits',
    'organic vegetables',
    'eco-friendly store',
  ],

  openGraph: {
    title: 'EcoFila | Organic Store',
    description:
      'Buy fresh, natural, and sustainable organic food products online. Healthy groceries, organic fruits, vegetables, and eco-friendly choices delivered to your door.',
    url: 'https://ecofila.vercel.app',
    siteName: 'EcoFila | Organic Store',
    images: [
      {
        url: 'https://ecofila.vercel.app/Logo.ico',
        width: 1200,
        height: 630,
        alt: 'EcoFila Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EcoFila | Organic Store',
    description:
      'Shop fresh, healthy, and sustainable organic food online. Enjoy natural groceries, fruits, vegetables, and eco-friendly products.',
    images: ['https://ecofila.vercel.app/Logo.ico'],
  },

  alternates: {
    canonical: 'https://ecofila.vercel.app',
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
      <body className={`${poppins.className} bg-white`}>
        <NavigationProgress />
        <Navbar />
        <BreadCrumbs />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
      <Analytics />
      <SpeedInsights />
      <Toaster position="top-right" />
    </html>
  );
}
