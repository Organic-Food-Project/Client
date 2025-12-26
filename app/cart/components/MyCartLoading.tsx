import CartTable from '@/app/cart/components/CartTable';
import { Button } from '@/components/ui/button';

const MyCart = () => {
  return (
    <div className="flex flex-col-reverse lg:grid grid-cols-6 gap-6">
      <div className="col-span-4">
        <CartTable loading={true} myData={[]} />
      </div>
      <div className="lg:sticky top-[110] col-span-2 border border-gray-100 p-6 h-fit">
        <p className="text-body-xl font-semibold pb-[7px]">Cart Total</p>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Subtotal:</p>
          <p className="bg-gray-100 animate-pulse w-[30px] h-[21px]" />
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Shipping:</p>
          <p className="bg-gray-100 animate-pulse w-[30px] h-[21px]" />
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3 border-b border-gray-100">
          <p>Discount:</p>
          <p className="bg-gray-100 animate-pulse w-[30px] h-[21px]" />
        </div>
        <div className="text-body-small text-gray-700 flex justify-between py-3">
          <p>Total:</p>
          <p className="bg-gray-100 animate-pulse w-[70px] h-[21px]" />
        </div>
        <Button disabled className="w-full py-4 mt-5">Proceed to checkout</Button>
      </div>
    </div>
  );
};

export default MyCart;
