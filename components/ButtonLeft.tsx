import { ArrowLeft } from 'lucide-react';
import React from 'react';

const ButtonLeft = () => {
  return (
    <button className="group cursor-pointer hover:bg-primary duration-300 bg-white rounded-full border border-gray-200 p-3">
      <ArrowLeft className="group-hover:text-white duration-300" />
    </button>
  );
};

export default ButtonLeft;
