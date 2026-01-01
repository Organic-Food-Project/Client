'use client';
import { usePathname } from 'next/navigation';
import BreadCrumbsBg from '@/assets/Breadcrumbs.webp';
import Image from 'next/image';
import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';
import CustomLink from './CustomLink';

const BreadCrumbs = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const pathArray = pathname.split('/').filter(Boolean);

  const generateHref = (index: number) => {
    return '/' + pathArray.slice(0, index + 1).join('/');
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="z-1 relative w-full min-h-[120px] mainPadding flex items-center"
    >
      <Image
        src={BreadCrumbsBg}
        alt="Breadcrumbs background"
        className="z-[-1] absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
      />

      <ol className="flex gap-3 items-center flex-wrap text-4xl text-white">
        <li>
          <CustomLink href="/" aria-label="Home">
            <House className="text-gray-400" />
          </CustomLink>
        </li>

        {pathArray.map((segment, index) => {
          const href = generateHref(index);
          const isLast = index === pathArray.length - 1;
          const title = segment.replaceAll('-', ' ');
          const label = (
            title.charAt(0).toUpperCase() + title.slice(1)
          ).replace('%20', ' ');

          return (
            <li key={href} className="flex items-center gap-3">
              <ChevronRight size={20} className="text-gray-400" />
              {isLast ? (
                <span
                  className="text-body-medium text-primary"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <CustomLink
                  href={href}
                  className="text-body-medium text-gray-400 hover:text-white transition"
                >
                  {label}
                </CustomLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
