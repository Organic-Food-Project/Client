'use client';
import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UserSettings() {
  const [profileImage, setProfileImage] = useState(
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-profile-y1cvdWbhSPrGNX7LKZoIaQKKM355F3.png'
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Account Settings Section */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h1 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Account Settings
        </h1>

        <div className="flex gap-12 px-6 py-6">
          {/* Left Column - Form Fields */}
          <div className="flex-1 space-y-6">
            <Input
              Label="First name"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="first_name"
              id="first_name"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Last name"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="last_name"
              id="last_name"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Email"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="email"
              id="email"
              type="email"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Phone Number"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="phone"
              id="phone"
              type="tel"
              className="focus-visible:border-primary"
            />
            <Button type="button" className="w-[167px]">
              Save Changes
            </Button>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <Image
              src={profileImage}
              alt="Profile"
              width={224}
              height={224}
              className="rounded-full min-h-[224px] min-w-[224px] max-w-[224px] min-h-[224px]"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer text-center font-semibold text-body-medium border-2 border-primary bg-white text-primary rounded-full py-3 w-[167px]"
            >
              Change Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Billing Address Section */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Billing Address
        </h2>

        <div className="space-y-6 px-6 py-6">
          {/* First Row - Name Fields */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              Label="First name"
              required
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="billing_first_name"
              id="billing_first_name"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Last name"
              required
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="billing_last_name"
              id="billing_last_name"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Company Name"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="company_name"
              id="company_name"
              type="text"
              className="focus-visible:border-primary"
            />
          </div>

          {/* Street Address */}
          <Input
            Label="Street Address"
            labelClassName="block text-sm font-medium text-gray-700 mb-2"
            name="street"
            id="street"
            type="text"
            className="focus-visible:border-primary"
          />

          {/* Second Row - Location Fields */}
          <div className="grid grid-cols-3 gap-4">
            <Input
              Label="Country / Region"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="country"
              id="country"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="States"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="state"
              id="state"
              type="text"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Zip Code"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="zip"
              id="zip"
              type="text"
              className="focus-visible:border-primary"
            />
          </div>

          {/* Third Row - Contact Fields */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              Label="Email"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="billing_email"
              id="billing_email"
              type="email"
              className="focus-visible:border-primary"
            />
            <Input
              Label="Phone"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="billing_phone"
              id="billing_phone"
              type="tel"
              className="focus-visible:border-primary"
            />
          </div>

          <Button type="button" className="w-[167px]">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-white rounded-lg border-1 border-gray-100">
        <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
          Change Password
        </h2>

        <div className="space-y-6 px-6 py-6">
          {/* Current Password */}
          <Input
            Label="Current Password"
            labelClassName="block text-sm font-medium text-gray-700 mb-2"
            name="current_password"
            id="current_password"
            type="password"
            className="focus-visible:border-primary"
          />

          {/* New + Confirm Password */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              Label="New Password"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="new_password"
              id="new_password"
              type="password"
              className="focus-visible:border-primary"
            />

            <Input
              Label="Confirm Password"
              labelClassName="block text-sm font-medium text-gray-700 mb-2"
              name="confirm_password"
              id="confirm_password"
              type="password"
              className="focus-visible:border-primary"
            />
          </div>

          <Button type="button" className="w-[194px]">
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}
