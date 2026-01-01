'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

interface ProgressBarProps {
  isLoading: boolean;
}

const ProgressBar = ({ isLoading }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 90);
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-[#00b207] transition-all duration-300 ease-out shadow-[0_2px_10px_rgba(0,178,7,0.4)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

interface CustomLinkProps extends LinkProps {
  target?: string;
  children: ReactNode;
  className?: string;
}

const CustomLink = ({
  href,
  target,
  children,
  className = '',
  ...props
}: CustomLinkProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClick = () => {
    const targetPath = typeof href === 'string' ? href : href.pathname || '';

    if (targetPath === pathname) {
      return;
    }

    setIsNavigating(true);
  };

  return (
    <>
      <ProgressBar isLoading={isNavigating} />
      <Link
        href={href}
        onClick={handleClick}
        className={className}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </>
  );
};

export default CustomLink;
