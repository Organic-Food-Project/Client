'use client';
import { usePathname } from 'next/navigation';
import BreadCrumbsBg from '@/assets/Breadcrumbs.png';
import Image from 'next/image';
import { ChevronRight, House } from 'lucide-react';
import Link from 'next/link';

const BreadCrumbs = () => {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const pathArray = pathname.split('/').filter(Boolean);

  const generateHref = (index: number) => {
    return '/' + pathArray.slice(0, index + 1).join('/');
  };

  return (
    <div className="z-1 relative w-full h-[120px] mainPadding flex items-center">
      <Image
        src={BreadCrumbsBg}
        alt="Bread Crumbs Bg"
        className="z-[-1] absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
      />
      <div className="text-4xl text-white flex gap-3 items-center">
        <Link href="/">
          <House className="text-gray-400" />
        </Link>

        {pathArray.map((segment, index) => {
          const href = generateHref(index);
          const isLast = index === pathArray.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <div key={href} className="flex items-center gap-3">
              <ChevronRight size={20} className="text-gray-400" />
              {isLast ? (
                <span className="text-body-medium text-primary">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="text-body-medium text-gray-400 hover:text-white transition"
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreadCrumbs;
