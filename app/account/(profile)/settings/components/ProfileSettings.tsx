'use client';

import Image from 'next/image';
import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  updateProfileAction,
  uploadProfileImageAction,
} from '@/lib/actions/UserActions';

export default function ProfileSettings() {
  const [preview, setPreview] = useState<string | null>(null);

  // Image Upload State
  const [imageState, imageAction, loadingImage] = useActionState(
    uploadProfileImageAction,
    { errors: {} }
  );

  // Profile Form State
  const [profileState, profileAction, loadingProfile] = useActionState(
    updateProfileAction,
    { errors: {} }
  );

  // Show toast only when success changes to true
  useEffect(() => {
    if (imageState.success) {
      Toast({ Message: 'Profile image updated!', type: 'success' });
    }
  }, [imageState.success]);

  useEffect(() => {
    if (profileState.success) {
      Toast({ Message: 'Profile updated successfully!', type: 'success' });
    }
  }, [profileState.success]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg border-1 border-gray-100">
      <h1 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
        Account Settings
      </h1>

      <div className="flex gap-12 px-6 py-6">
        {/* Profile Form */}
        <form action={profileAction} className="flex-1 space-y-6">
          <Input name="first_name" Label="First name" required />
          <Input name="last_name" Label="Last name" required />
          <Input name="email" Label="Email" type="email" required />
          <Input name="phone" Label="Phone" />

          <Button
            className="w-[167px]"
            loading={loadingProfile}
            disabled={loadingProfile}
          >
            Save Changes
          </Button>
        </form>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <Image
            src={preview || '/default-user.png'}
            alt="Profile"
            width={224}
            height={224}
            className="rounded-full min-h-[224px] min-w-[224px] bg-gray-100 max-w-[224px]"
          />

          <form action={imageAction}>
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-center border-2 border-primary bg-white text-primary rounded-full py-3 w-[167px] block"
            >
              {loadingImage ? 'Uploading...' : 'Change Image'}
            </label>

            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
