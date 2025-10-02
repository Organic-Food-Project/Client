import { Star } from 'lucide-react';
import React from 'react';

const Rating = ({ rate, size = 'size-5' }: { rate: number; size?: string }) => {
  return (
    <>
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        const normalizedRating = Math.max(0, Math.min(rate, 5));

        if (normalizedRating >= starValue) {
          return (
            <Star key={i} className={`${size} text-warning fill-warning`} />
          );
        } else if (normalizedRating >= starValue - 0.5) {
          return (
            <div key={i} className={`relative ${size}`}>
              <Star
                className={`absolute text-gray-200 fill-gray-200 ${size}`}
              />
              <Star
                className={`absolute ${size} text-warning fill-warning clip-half`}
              />
            </div>
          );
        } else {
          return (
            <Star key={i} className={`${size} text-gray-200 fill-gray-200`} />
          );
        }
      })}
    </>
  );
};

export default Rating;
