import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/stores";

const PaymentView = () => {
  const { selected_category, set_toss_payment_popup_show } = usePaymentStore();

  const handleShowTossPaymentPopUp = () => {
    set_toss_payment_popup_show(true);
  };

  return (
    <div className="w-full px-[100px]">
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border bg-white">
        {!selected_category && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">Payment Category Not Selected!</p>
            <p className="text-gray-600">choose your payment category above</p>
          </div>
        )}
        {selected_category && (
          <div className="flex">
            <Button onClick={handleShowTossPaymentPopUp}>TEST</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentView;
