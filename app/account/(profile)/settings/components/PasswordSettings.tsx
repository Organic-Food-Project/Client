'use client';

import { useActionState, useEffect, useRef } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordAction } from '@/lib/actions/UserActions';

export default function PasswordSettings() {
  const formRef = useRef<HTMLFormElement>(null);

  const [passwordState, passwordAction, loadingPassword] = useActionState(
    changePasswordAction,
    { errors: {} }
  );

  useEffect(() => {
    if (passwordState.success) {
      Toast({ Message: 'Password changed!', type: 'success' });
      formRef.current?.reset();
    }
  }, [passwordState]);

  return (
    <div className="bg-white rounded-lg border-1 border-gray-100">
      <h2 className="text-2xl font-semibold border-b-1 border-gray-100 py-4 px-6">
        Change Password
      </h2>

      <form
        ref={formRef}
        action={passwordAction}
        className="space-y-6 px-6 py-6"
      >
        <Input
          name="currentPassword"
          type="password"
          Label="Current Password"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="NewPassword"
            type="password"
            Label="New Password"
            required
          />
          <Input
            name="confirmPassword"
            type="password"
            Label="Confirm Password"
            required
          />
        </div>

        {passwordState.errors?.form && (
          <p className="text-red-500 text-sm">{passwordState.errors.form}</p>
        )}

        {passwordState.errors?.confirmPassword && (
          <p className="text-red-500 text-sm">
            {passwordState.errors.confirmPassword}
          </p>
        )}

        <Button
          type="submit"
          className="w-[194px]"
          loading={loadingPassword}
          disabled={loadingPassword}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
}
