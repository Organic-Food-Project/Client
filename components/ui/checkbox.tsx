'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  checkBoxType?: 'circle' | 'square';
}

function Checkbox({
  className,
  checkBoxType = 'square',
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'border-gray-200 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 shadow-xs transition-shadow outline-none disabled:cursor-not-allowed disabled:opacity-50',
        checkBoxType === 'circle'
          ? 'bg-white data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary size-5 rounded-full border-[2px] focus-visible:ring-[1px]'
          : 'dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary size-4 rounded-[4px] border focus-visible:ring-[3px]',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {checkBoxType === 'square' && <CheckIcon className="size-3.5" />}
        {props.checked && checkBoxType === 'circle' ? (
          <div className="size-[12px] bg-primary rounded-full" />
        ) : null}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
