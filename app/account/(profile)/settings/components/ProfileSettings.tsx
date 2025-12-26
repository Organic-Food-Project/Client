'use client';

import Image from 'next/image';
import { useActionState, useEffect, useState, useTransition } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  updateProfileAction,
  uploadProfileImageAction,
} from '@/lib/actions/UserActions';

// تعريفات Typescript (اضبطها إذا كانت لديك تعريفات أخرى)
type ActionState = {
  success?: boolean;
  errors?: Record<string, string>;
};

interface ProfileSettingsProps {
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    Phone_Number: string;
    Profile_Image_URL: string;
  };
}

export default function ProfileSettings({ data }: ProfileSettingsProps) {
  const [isPending, startTransition] = useTransition();
  // Track current profile image (either from server or preview)
  const [currentImage, setCurrentImage] = useState<string>(
    data?.Profile_Image_URL || ''
  );
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [phone, setPhone] = useState(data?.Phone_Number || '');
  const [savedState, setSavedState] = useState({
    firstName: data?.firstName,
    lastName: data?.lastName,
    phone: data?.Phone_Number || '',
  });
  const uploading = isUploading || isPending;

  const [imageState, imageAction] = useActionState<ActionState, FormData>(
    uploadProfileImageAction,
    {
      errors: {},
    }
  );

  const [profileState, profileAction, loadingProfile] = useActionState(
    updateProfileAction,
    { errors: {} }
  );

  useEffect(() => {
    if (imageState.success) {
      // Keep the preview as the new current image
      if (preview) {
        setCurrentImage(preview);
        setPreview(null);
      }
      setIsUploading(false);
    } else if (imageState.errors && Object.keys(imageState.errors).length > 0) {
      // Revert to old image
      setPreview(null);
      setIsUploading(false);
    }
  }, [imageState, preview]);

  useEffect(() => {
    if (imageState.success) {
      Toast({ Message: 'Profile image updated!', type: 'success' });
    } else if (imageState.errors && Object.keys(imageState.errors).length > 0) {
      const errorMsg = Object.values(imageState.errors)[0];
      Toast({ Message: errorMsg as string, type: 'error' });
    }
  }, [imageState]);

  useEffect(() => {
    if (profileState.success) {
      Toast({ Message: 'Profile updated successfully!', type: 'success' });
      setSavedState({
        firstName,
        lastName,
        phone,
      });
    } else if (
      profileState.errors &&
      Object.keys(profileState.errors).length > 0
    ) {
      const errorMsg =
        profileState.errors.form || Object.values(profileState.errors)[0];
      Toast({ Message: errorMsg as string, type: 'error' });
      setFirstName(savedState.firstName);
      setLastName(savedState.lastName);
      setPhone(savedState.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileState]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('image', file);

    startTransition(async () => {
      await imageAction(formData);
    });
  };

  // Display preview if exists, otherwise current image
  const displayImage = preview || currentImage;

  return (
    <div className="bg-white rounded-lg border-1 border-gray-100">
      <h1 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
        Account Settings
      </h1>

      <div className="flex gap-12 px-6 py-6">
        <form action={profileAction} className="flex-1 space-y-6">
          <Input Label="Email" defaultValue={data?.email} disabled />
          <Input
            name="firstName"
            Label="First name"
            type="string"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loadingProfile}
            required
          />
          <Input
            name="lastName"
            Label="Last name"
            type="string"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={loadingProfile}
            required
          />
          <Input
            name="Phone_Number"
            Label="Phone"
            type="string"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loadingProfile}
          />

          {profileState.errors?.form && (
            <p className="text-red-500 text-sm">{profileState.errors.form}</p>
          )}

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
          <div className="relative">
            <Image
              src={displayImage}
              alt="Profile"
              width={224}
              height={224}
              className="rounded-full min-h-[224px] min-w-[224px] max-w-[224px] h-[224px] w-[224px] object-cover bg-gray-100"
            />

            {/* Blur overlay when uploading */}
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <form method="POST" encType="multipart/form-data">
            <label
              htmlFor="image"
              className={`cursor-pointer text-center border-2 border-primary bg-white text-primary rounded-full py-3 w-[167px] block transition-opacity ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Uploading...' : 'Change Image'}
            </label>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
              disabled={uploading}
            />
          </form>

          {imageState.errors?.image && (
            <p className="text-red-500 text-sm text-center">
              {imageState.errors.image as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
