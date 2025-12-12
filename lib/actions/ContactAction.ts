'use server';
import { z } from 'zod';
import Mutation from '@/lib/Mutation';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export const ContactAction = async (
  prevState: { errors?: Record<string, string>; success?: boolean },
  formData: FormData
): Promise<{ errors?: Record<string, string>; success?: boolean }> => {
  const values = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  };

  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        errors[issue.path[0].toString()] = issue.message;
      }
    });

    return { errors };
  }

  const { error } = await Mutation({
    api: 'v1/contactUs',
    method: 'POST',
    body: parsed.data,
  });

  if (error) {
    return {
      errors: { form: error?.data ?? error ?? 'Something went wrong' },
    };
  }

  return { success: true };
};
