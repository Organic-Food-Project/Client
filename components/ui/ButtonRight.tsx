'use client';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonRightProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const ButtonRight: React.FC<ButtonRightProps> = ({
  disabled = false,
  className = '',
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="Right slider button"
      className={cn(
        'group rounded-full border border-gray-200 p-3',
        disabled
          ? 'cursor-not-allowed bg-white/50 border-black/10 text-black/10 duration-0'
          : 'cursor-pointer bg-white hover:bg-primary duration-300',
        className
      )}
    >
      <ArrowRight
        className={cn(
          disabled
            ? 'text-black/10 duration-0'
            : 'group-hover:text-white duration-300'
        )}
      />
    </button>
  );
};

export default ButtonRight;
