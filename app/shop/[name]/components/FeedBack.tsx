'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Rating from '@/components/Rating';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface CustomerFeedbackProps {
  reviews: Review[];
  productData: {
    _id: string;
  };
}

export default function FeedBack({
  reviews,
  productData,
}: CustomerFeedbackProps) {
  const [visibleReviews, setVisibleReviews] = useState(4);

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 4);
  };

  return (
    <div className="w-full pt-8">
      {/* Tabs */}
      <div className="flex justify-center gap-8 border-b border-gray-200 mb-8">
        <div
          className={`pb-4 text-body-medium font-medium transition-colors relative text-gray-900`}
        >
          Customer Feedback
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
        </div>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={review.avatar || '/placeholder.svg'}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Rating rate={review.rating} size="size-4" />
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-600 leading-relaxed ml-[60px]">
              {review.comment}
            </p>
          </div>
        ))}

        {visibleReviews < reviews.length && (
          <div className="flex justify-center">
            <Button
              onClick={loadMore}
              className="border-primary text-primary hover:bg-primary hover:text-white transition-colors bg-hard-primary/10 px-[32px] py-[14px]"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
