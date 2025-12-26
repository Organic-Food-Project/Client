'use client';

import { useState, useTransition, useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Rating from '@/components/Rating';
import dayjs from 'dayjs';
import { CreateReview } from '@/lib/actions/ProductAction';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  userID: {
    firstName: string;
    lastName: string;
    _id: string;
    Profile_Image_URL: string;
  };
  avatar: string;
  rate: number;
  comment: string;
  createdAt: string;
}

interface CustomerFeedbackProps {
  allReviews: Review[];
  productId: string;
  hasToken: boolean;
}

export default function FeedBack({
  allReviews,
  productId,
  hasToken,
}: CustomerFeedbackProps) {
  const [reviews, setReviews] = useState<Review[]>(allReviews);
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(CreateReview, {});

  useEffect(() => {
    if (state.success && state.review) {
      // Add new review to the beginning of the list
      setReviews((prev) => [...prev, state.review]);
      // Reset form
      setComment('');
      setRating(0);
    }
  }, [state.success, state.review]);

  const loadMore = () => {
    setVisibleReviews((prev) => prev + 4);
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
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

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {review.userID.Profile_Image_URL && (
                    <Image
                      src={review.userID.Profile_Image_URL}
                      alt={
                        review.userID.firstName + ' ' + review.userID.lastName
                      }
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {review.userID.firstName + ' ' + review.userID.lastName}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Rating rate={review.rate} size="size-4" />
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 flex flex-col text-center">
                <span className="text-[14px] font-medium">
                  {dayjs(new Date(review.createdAt)).format('h:mm A')}
                </span>
                <span className="text-[12px]">
                  {dayjs(new Date(review.createdAt)).format('YYYY-MM-DD')}
                </span>
              </span>
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

      {/* Submit Review Form - Only show if user has token */}
      {hasToken && (
        <div className="my-10 rounded-2xl bg-white shadow-lg border border-gray-100 p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-[#2c742f]">
              Write a Review
            </h3>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="prID" value={productId} />
            <input type="hidden" name="rating" value={rating} />

            {/* Rating */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Your Rating
              </label>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform duration-200 hover:scale-125"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-warning text-warning'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {state.errors?.rating && (
                <p className="text-red-500 text-xs mt-2">
                  {state.errors.rating}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Your Review
              </label>

              <Textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like about this product?"
                disabled={isPending}
                className="
          min-h-[140px] resize-none rounded-xl
          border-gray-200
          focus:border-[#00b207]
          focus:ring-[#84d187]/40
        "
              />

              {state.errors?.comment && (
                <p className="text-red-500 text-xs mt-2">
                  {state.errors.comment}
                </p>
              )}
            </div>

            {/* Error */}
            {state.errors?.form && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-red-600 text-sm">{state.errors.form}</p>
              </div>
            )}

            {/* Success */}
            {state.success && (
              <div className="rounded-xl bg-[#84d187]/20 border border-[#84d187] px-4 py-3">
                <p className="text-[#2c742f] text-sm">
                  ✅ Review submitted successfully!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !comment.trim() || rating === 0}
              className="cursor-pointer
        w-full h-12 rounded-full
        bg-[#00b207] hover:bg-[#2c742f]
        text-white font-semibold
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-alloweds
      "
            >
              {isPending ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
