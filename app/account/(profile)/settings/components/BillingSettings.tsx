'use client';

import { useActionState, useEffect } from 'react';
import Toast from '@/components/ui/Toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateBillingAddressAction } from '@/lib/actions/UserActions';

export default function BillingSettings() {
  const [billingState, billingAction, loadingBilling] = useActionState(
    updateBillingAddressAction,
    { errors: {} }
  );

  useEffect(() => {
    if (billingState.success) {
      Toast({ Message: 'Billing address updated!', type: 'success' });
    }
  }, [billingState.success]);

  return (
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
  );
}
