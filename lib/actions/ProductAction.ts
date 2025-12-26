/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import Mutation from '@/lib/Mutation';

const reviewSchema = z.object({
  comment: z.string().min(10, 'Review must be at least 10 characters'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  prID: z.string().min(1, 'Product ID is required'),
});

export const CreateReview = async (
  prevState: {
    errors?: Record<string, string>;
    success?: boolean;
    review?: any;
  },
  formData: FormData
): Promise<{
  errors?: Record<string, string>;
  success?: boolean;
  review?: any;
}> => {
  const values = {
    comment: formData.get('comment'),
    rating: Number(formData.get('rating')),
    prID: formData.get('prID'),
  };

  const parsed = reviewSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errors[issue.path[0].toString()] = issue.message;
      }
    });

    return { errors };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      errors: { form: 'You must be logged in to submit a review' },
    };
  }

  const { data, error } = await Mutation({
    api: 'v1/review',
    method: 'POST',
    body: {
      comment: parsed.data.comment,
      prID: parsed.data.prID,
      rating: parsed.data.rating,
    },
  });

  if (error) {
    return {
      errors: { form: error?.data ?? error ?? 'Something went wrong' },
    };
  } else {
    return { success: true, review: data?.data };
  }
};
