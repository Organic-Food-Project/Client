import { ArrowRight } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonRightProps {
  className?: string;
}

const ButtonRight: React.FC<ButtonRightProps> = ({ className = '' }) => {
  return (
    <button
      aria-label="Right slider button"
      className={cn(
        'group cursor-pointer hover:bg-primary duration-300 bg-white rounded-full border border-gray-200 p-3',
        className
      )}
    >
      <ArrowRight className="group-hover:text-white duration-300" />
    </button>
  );
};

export default ButtonRight;
