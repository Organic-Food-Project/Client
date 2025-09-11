'use client';
import React from 'react';
import CountUp from 'react-countup';

interface StaticsCardProps {
  title: number;
  suffix?: string;
  description: string;
}

const StaticsCard: React.FC<StaticsCardProps> = ({
  title = 0,
  suffix = '',
  description,
}) => {
  return (
    <div className="bg-white/[0.07] flex items-center justify-center flex-col w-full p-4 h-[174px] rounded-[8px]">
      <p className="text-primary text-[56px] leading-[120%] h-[62px]">
        <CountUp enableScrollSpy end={title} />
        {suffix}
      </p>
      <p className="text-body-large text-white">{description}</p>
    </div>
  );
};

export default StaticsCard;
