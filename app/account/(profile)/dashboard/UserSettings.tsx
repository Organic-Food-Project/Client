import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface UserSettingsProps {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
  };
}

const UserSettings: React.FC<UserSettingsProps> = ({ customer }) => {
  return (
    <div className="flex gap-[24px]">
      {/* Customer Profile Card */}
      <div className="border-1 border-gray-100 h-[278px] w-[54%] p-8 flex flex-col items-center justify-center text-center">
        <Image
          width={120}
          height={120}
          src={customer.avatar}
          alt={customer.name}
          className="rounded-full min-h-[120px] min-w-[120px] max-w-[20px] min-h-[120px]"
        />
        <h2 className="text-xl font-semibold text-foreground line-clamp-1">
          {customer.name}
        </h2>
        <p className="text-muted-foreground text-sm pt-2">Customer</p>
        <Link
          href="/account/settings"
          className="ursor-pointer text-center pt-3 font-medium text-body-medium text-primary"
        >
          Edit Profile
        </Link>
      </div>

      {/* Billing Address Card */}
      <div className="border-1 border-gray-100 h-[278px] w-[46%] p-8">
        <h3 className="text-base font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Billing Address
        </h3>
        <div className="space-y-3 mb-6">
          <div>
            <p className="font-semibold text-gray-900 text-body-large line-clamp-1">
              {customer.name}
            </p>
          </div>
          <div className="flex items-start gap-2">
            <p className="text-gray-600 text-body-small line-clamp-2">
              {customer.address}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-900 text-body-medium line-clamp-1">
              {customer.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-900 text-body-medium line-clamp-1">
              {customer.phone}
            </p>
          </div>
        </div>
        <Link
          href="/account/settings"
          className="ursor-pointer text-center font-medium text-body-medium text-primary"
        >
          Edit Address
        </Link>
      </div>
    </div>
  );
};

export default UserSettings;
