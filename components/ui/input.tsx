'use client';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react';

interface InputProps extends React.ComponentProps<'input'> {
  error?: string;
}

function Input({ className, error, type, ...props }: InputProps) {
  const [inputType, setInputType] = useState(type);
  return (
    <>
      <div className="relative">
        <input
          type={inputType}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-100 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-gray-100 focus-visible:ring-ring/50 focus-visible:ring-[0.5px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className
          )}
          {...props}
        />
        {type === 'password' && (
          <button
            aria-label="View password"
            type="button"
            onClick={() =>
              setInputType(inputType === 'password' ? 'text' : 'password')
            }
            className="cursor-pointer flex items-center justify-center absolute top-0 right-0 w-fit h-full px-2"
          >
            {inputType === 'password' && (
              <EyeClosed className="text-gray-600" />
            )}
            {inputType === 'text' && <Eye className="text-gray-600" />}
          </button>
        )}
      </div>
      {error && <p className="text-body-small text-danger mb-2">{error}</p>}
    </>
  );
}

export { Input };
