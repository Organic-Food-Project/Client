import React from 'react';

interface StaticsCardProps {
  title: string;
  description: string;
}

const StaticsCard: React.FC<StaticsCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white/[0.07] flex items-center justify-center flex-col p-4 h-[174px] rounded-[8px]">
      <p className="text-primary font-poppins text-[56px] leading-[120%]">
        {title}
      </p>
      <p className="text-body-large text-white">{description}</p>
    </div>
  );
};

export default StaticsCard;
