'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

let globalIsNavigating = false;
let globalSetNavigating: ((value: boolean) => void) | null = null;

type ProgressDirection =
  | 'top-to-right' // Top, from left to right
  | 'top-to-left' // Top, from right to left
  | 'bottom-to-right' // Bottom, from left to right
  | 'bottom-to-left' // Bottom, from right to left
  | 'left-to-bottom' // Left, from top to bottom
  | 'left-to-top' // Left, from bottom to top
  | 'right-to-bottom' // Right, from top to bottom
  | 'right-to-top'; // Right, from bottom to top

const getPositionClasses = (direction: ProgressDirection) => {
  switch (direction) {
    case 'top-to-right':
    case 'top-to-left':
      return 'top-0 left-0 w-full h-1';
    case 'bottom-to-right':
    case 'bottom-to-left':
      return 'bottom-0 left-0 w-full h-1';
    case 'left-to-bottom':
    case 'left-to-top':
      return 'top-0 left-0 h-full w-1';
    case 'right-to-bottom':
    case 'right-to-top':
      return 'top-0 right-0 h-full w-1';
    default:
      return 'top-0 left-0 w-full h-1';
  }
};

const getProgressStyle = (progress: number, direction: ProgressDirection) => {
  const scale = progress / 100;

  switch (direction) {
    case 'top-to-right':
    case 'bottom-to-right':
      return {
        transform: `scaleX(${scale})`,
        transformOrigin: 'left',
      };

    case 'top-to-left':
    case 'bottom-to-left':
      return {
        transform: `scaleX(${scale})`,
        transformOrigin: 'right',
      };

    case 'left-to-bottom':
    case 'right-to-bottom':
      return {
        transform: `scaleY(${scale})`,
        transformOrigin: 'top',
      };

    case 'left-to-top':
    case 'right-to-top':
      return {
        transform: `scaleY(${scale})`,
        transformOrigin: 'bottom',
      };

    default:
      return {};
  }
};

interface ProgressBarProps {
  isLoading: boolean;
  direction?: ProgressDirection;
  containerClassName?: string;
  progressClassName?: string;
  color?: string;
}

const ProgressBar = ({
  isLoading,
  direction = 'top-to-right',
  containerClassName = '',
  progressClassName = '',
  color = '#00b207',
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  if (!shouldShow || !mounted) return null;

  const isVertical =
    direction.startsWith('left-') || direction.startsWith('right-');

  const progressBar = (
    <div
      className={cn(
        'fixed z-50',
        getPositionClasses(direction),
        containerClassName
      )}
    >
      <div
        className={cn(
          'transition-transform duration-300 ease-out',
          isVertical ? 'h-full w-full' : 'h-full w-full',
          progressClassName
        )}
        style={{
          ...getProgressStyle(progress, direction),
          backgroundColor: color,
          boxShadow: `0 2px 10px ${color}`,
        }}
      />
    </div>
  );

  return createPortal(progressBar, document.body);
};

interface NavigationProgressProps {
  direction?: ProgressDirection;
  containerClassName?: string;
  progressClassName?: string;
  color?: string;
}

export const NavigationProgress = ({
  direction = 'top-to-right',
  containerClassName = '',
  progressClassName = '',
  color = '#00b207',
}: NavigationProgressProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    globalSetNavigating = setIsNavigating;
    return () => {
      globalSetNavigating = null;
    };
  }, []);

  useEffect(() => {
    if (isNavigating) {
      setIsNavigating(false);
      globalIsNavigating = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <ProgressBar
      isLoading={isNavigating}
      direction={direction}
      containerClassName={containerClassName}
      progressClassName={progressClassName}
      color={color}
    />
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
  const pathname = usePathname();

  const handleClick = () => {
    const targetPath = typeof href === 'string' ? href : href.pathname || '';

    if (targetPath === pathname || globalIsNavigating) {
      return;
    }

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
