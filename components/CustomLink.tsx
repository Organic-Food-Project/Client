'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';

// State مشترك بين كل الـ components
let globalIsNavigating = false;
let globalSetNavigating: ((value: boolean) => void) | null = null;

interface ProgressBarProps {
  isLoading: boolean;
}

const ProgressBar = ({ isLoading }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldShow(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 90);
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (shouldShow) {
      setProgress(100);
      const timeout = setTimeout(() => {
        setShouldShow(false);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[99999999999999]">
      <div
        className="h-full bg-[#00b207] transition-all duration-300 ease-out shadow-[0_2px_10px_rgba(0,178,7,0.4)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export const NavigationProgress = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  // حفظ الـ setter عشان نستخدمه في CustomLink
  useEffect(() => {
    globalSetNavigating = setIsNavigating;
    return () => {
      globalSetNavigating = null;
    };
  }, []);

  // لما الـ pathname يتغير، أوقف الـ loading
  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      globalIsNavigating = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <ProgressBar isLoading={isNavigating} />;
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
  const pathname = usePathname();

  const handleClick = () => {
    const targetPath = typeof href === 'string' ? href : href.pathname || '';

    // لو نفس الصفحة، متعملش حاجة
    if (targetPath === pathname) {
      return;
    }

    // لو في تنقل شغال، متعملش حاجة
    if (globalIsNavigating) {
      return;
    }

    // شغل الـ loading
    globalIsNavigating = true;
    if (globalSetNavigating) {
      globalSetNavigating(true);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};

export default CustomLink;
