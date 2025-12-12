'use client';

import Image from 'next/image';
import { useActionState } from 'react';
import { useState } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  updateProfileAction,
  updateBillingAddressAction,
  changePasswordAction,
  uploadProfileImageAction,
} from '@/lib/actions/UserActions';

export default function UserSettings() {
  // --------- Image Upload -------------
  const [preview, setPreview] = useState<string | null>(null);
  const [imageState, imageAction, loadingImage] = useActionState(
    uploadProfileImageAction,
    { errors: {} }
  );

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append('image', file);
    imageAction(fd);
  };

  if (imageState.success) {
    Toast({ Message: 'Profile image updated!', type: 'success' });
  }

  // ---------- PROFILE FORM ------------
  const [profileState, profileAction, loadingProfile] = useActionState(
    updateProfileAction,
    { errors: {} }
  );

  if (profileState.success) {
    Toast({ Message: 'Profile updated successfully!', type: 'success' });
  }

  // ---------- BILLING FORM ------------
  const [billingState, billingAction, loadingBilling] = useActionState(
    updateBillingAddressAction,
    { errors: {} }
  );

  if (billingState.success) {
    Toast({ Message: 'Billing address updated!', type: 'success' });
  }

  // ---------- PASSWORD FORM ------------
  const [passwordState, passwordAction, loadingPassword] = useActionState(
    changePasswordAction,
    { errors: {} }
  );

  if (passwordState.success) {
    Toast({ Message: 'Password changed!', type: 'success' });
  }

  return (
    <div className="space-y-8">
      {/* Account Settings */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h1 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Account Settings
        </h1>

        <form action={profileAction} className="flex gap-12 px-6 py-6">
          <div className="flex-1 space-y-6">
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
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src={preview || '/default-user.png'}
              alt="Profile"
              width={224}
              height={224}
              className="rounded-full min-h-[224px] min-w-[224px] max-w-[224px] min-h-[224px]"
            />

            <label
              htmlFor="image-upload"
              className="cursor-pointer text-center border-2 border-primary bg-white text-primary rounded-full py-3 w-[167px]"
            >
              {loadingImage ? 'Uploading...' : 'Change Image'}
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </div>
        </form>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Billing Address
        </h2>

        <form action={billingAction} className="space-y-6 px-6 py-6">
          <div className="grid grid-cols-3 gap-4">
            <Input name="billing_first_name" Label="First name" required />
            <Input name="billing_last_name" Label="Last name" required />
            <Input name="company_name" Label="Company Name" />
          </div>

          <Input name="street" Label="Street Address" required />

          <div className="grid grid-cols-3 gap-4">
            <Input name="country" Label="Country" required />
            <Input name="state" Label="State" required />
            <Input name="zip" Label="Zip Code" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input name="billing_email" Label="Email" type="email" required />
            <Input name="billing_phone" Label="Phone" required />
          </div>

          <Button
            className="w-[167px]"
            loading={loadingBilling}
            disabled={loadingBilling}
          >
            Save Changes
          </Button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Change Password
        </h2>

        <form action={passwordAction} className="space-y-6 px-6 py-6">
          <Input
            name="current_password"
            type="password"
            Label="Current Password"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              name="new_password"
              type="password"
              Label="New Password"
              required
            />
            <Input
              name="confirm_password"
              type="password"
              Label="Confirm Password"
              required
            />
          </div>

          <Button
            className="w-[194px]"
            loading={loadingPassword}
            disabled={loadingPassword}
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
}
