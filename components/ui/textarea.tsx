import * as React from 'react';

import { cn } from '@/lib/utils';

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  error?: string;
  parentClassName?: string;
  required?: boolean;
  Label?: string;
  labelClassName?: string;
}

function Textarea({
  className,
  parentClassName,
  required = false,
  error,
  Label = '',
  labelClassName,
  ...props
}: TextAreaProps) {
  return (
    <div className={cn('w-full', parentClassName)}>
      {Label && (
        <>
          <label htmlFor={props.id} className={cn('', labelClassName)}>
            {Label}
            {required && <span className="text-red-500 pl-1">*</span>}
          </label>
        </>
      )}
      <textarea
        data-slot="textarea"
        placeholder={props.placeholder ?? Label ?? ''}
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',

          'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-100 flex h-[49px] w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-gray-100 focus-visible:ring-ring/50 focus-visible:ring-[0.5px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
      {error && <p className="text-body-small text-danger mb-2">{error}</p>}
    </div>
  );
}

export { Textarea };
