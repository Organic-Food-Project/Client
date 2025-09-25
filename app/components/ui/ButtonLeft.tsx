import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonLeftProps {
  className?: string;
}

const ButtonLeft: React.FC<ButtonLeftProps> = ({ className = '' }) => {
  return (
    <button
      aria-label="Left slider button"
      className={cn(
        'group cursor-pointer hover:bg-primary duration-300 bg-white rounded-full border border-gray-200 p-3',
        className
      )}
    >
      <ArrowLeft className="group-hover:text-white duration-300" />
    </button>
  );
};

export default ButtonLeft;
