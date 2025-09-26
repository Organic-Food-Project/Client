import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonLeftProps {
  disabled?: boolean;
  className?: string;
}

const ButtonLeft: React.FC<ButtonLeftProps> = ({
  disabled = false,
  className = '',
}) => {
  return (
    <button
      disabled={disabled}
      aria-label="Left slider button"
      className={cn(
        'group rounded-full border border-gray-200 p-3',
        disabled
          ? 'cursor-not-allowed bg-gray-100 border-gray-300 text-gray-400 duration-0'
          : 'cursor-pointer bg-white hover:bg-primary duration-300',
        className
      )}
    >
      <ArrowLeft
        className={cn(
          disabled
            ? 'text-gray-400 duration-0'
            : 'group-hover:text-white duration-300'
        )}
      />
    </button>
  );
};

export default ButtonLeft;
