'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { ContactAction } from '@/app/actions/ContactAction';
import { useState } from 'react';
import Toast from '@/components/ui/Toast';

export default function ContactForm() {
  const [state, action, loading] = useActionState(ContactAction, {
    errors: {},
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (state.success) {
    Toast({
      Message: 'Your message has been sent successfully!',
      type: 'success',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  return (
    <form action={action}>
      <Input
        Label="Name"
        labelClassName="sr-only"
        name="name"
        id="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        error={state?.errors?.name}
        className="mb-3 h-[49px]"
      />

      <Input
        Label="Email"
        labelClassName="sr-only"
        name="email"
        id="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={state?.errors?.email}
        className="mb-3 h-[49px]"
      />

      <Input
        Label="Subject"
        labelClassName="sr-only"
        name="subject"
        id="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        error={state?.errors?.subject}
        className="mb-3 h-[49px]"
      />

      <Textarea
        Label="Message"
        labelClassName="sr-only"
        name="message"
        id="message"
        placeholder="Your message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className="mb-3 min-h-[100px]"
      />
      {state?.errors?.message && (
        <p className="text-body-small text-danger mb-2">
          {state?.errors?.message}
        </p>
      )}

      <Button
        loading={loading || state.success}
        disabled={loading || state.success}
        className="w-full mt-2"
      >
        Send Message
      </Button>

      {state?.errors?.form && (
        <p className="text-body-small my-2 text-danger">
          {state?.errors?.form}
        </p>
      )}

      {state?.success && (
        <p className="text-green-600 text-body-small mt-3">
          Message sent successfully!
        </p>
      )}
    </form>
  );
}
