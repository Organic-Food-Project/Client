import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import Loader from './Loader';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'cursor-pointer text-center font-semibold text-body-medium bg-primary text-white rounded-full py-3',
        secondary:
          'cursor-pointer text-center font-semibold text-body-medium bg-[#56AC59]/10 text-primary rounded-full py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Button({
  className,
  variant,
  asChild = false,
  loading = false,
  onlyLoadingIcon = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
    onlyLoadingIcon?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {loading ? (
        <>
          {!onlyLoadingIcon && 'loading'}
          <Loader />
        </>
      ) : (
        props.children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
