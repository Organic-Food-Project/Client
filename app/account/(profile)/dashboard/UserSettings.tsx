import CustomLink from '@/components/CustomLink';
import Image from 'next/image';
import React from 'react';

interface UserSettingsProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    Phone_Number: string;
    Profile_Image_URL: string;
    role: string;
  };
}

const UserSettings: React.FC<UserSettingsProps> = ({ user }) => {
  return (
    <div className="border-1 border-gray-100 h-[278px] w-full p-8 flex flex-col items-center justify-center text-center">
      <Image
        width={120}
        height={120}
        src={user?.Profile_Image_URL ?? ''}
        alt={user?.firstName + ' ' + user?.lastName + ' profile image'}
        className="rounded-full object-cover min-h-[120px] min-w-[120px] max-w-[20px] w-[120px] h-[120px] bg-gray-100"
      />
      <h2 className="text-xl font-semibold text-foreground line-clamp-1">
        {user?.firstName + ' ' + user?.lastName}
      </h2>
      <p className="text-muted-foreground text-sm pt-2">{user?.role}</p>
      <CustomLink
        href="/account/settings"
        className="ursor-pointer text-center pt-3 font-medium text-body-medium text-primary"
      >
        Edit Profile
      </CustomLink>
    </div>
  );
};

export default UserSettings;
