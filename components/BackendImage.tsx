'use client';

import { useEffect, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import Logo from '@/assets/Logo.png';
import { cn } from '@/lib/utils';

export type BackendImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  /** `media`: rounded card (product/category). `avatar`: circular profile-style. */
  variant?: 'media' | 'avatar';
};

function hasRenderableSrc(src: unknown): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

export function BackendImage({
  src,
  variant = 'media',
  className,
  alt,
  onError,
  width,
  height,
  fill,
  title,
  ...rest
}: BackendImageProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const ok = hasRenderableSrc(src);

  useEffect(() => {
    setLoadFailed(false);
  }, [src]);

  const showPlaceholder = !ok || loadFailed;

  if (showPlaceholder) {
    return (
      <div
        role="img"
        title={title}
        aria-label={
          typeof alt === 'string' && alt ? alt : 'Ecofila image placeholder'
        }
        className={cn(
          'flex shrink-0 items-center justify-center bg-gray-50',
          variant === 'avatar' ? 'rounded-full' : 'rounded-[10px]',
          fill && 'absolute inset-0 size-full',
          className
        )}
      >
        <Image
          src={Logo}
          alt=""
          width={120}
          height={25}
          className={cn(
            'object-contain opacity-[0.42] grayscale',
            variant === 'avatar'
              ? 'max-h-[50%] max-w-[72%]'
              : 'max-h-[42%] w-[52%] max-w-[140px]'
          )}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      title={title}
      className={className}
      onError={(e) => {
        setLoadFailed(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
