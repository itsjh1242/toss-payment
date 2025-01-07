import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/stores";
import { PaymentAmountType } from "@/stores/usePaymentStore";

const PRODUCT_SAMPLE: { name: string; price: number; currency: string }[] = [
  { name: "깔끔한 바지", price: 1, currency: "KRW" },
  { name: "화려한 바지", price: 2, currency: "KRW" },
];

const PaymentView = () => {
  const {
    selected_category,
    set_toss_payment_popup_show,
    set_toss_payment_amount,
  } = usePaymentStore();

  const handleShowTossPaymentPopUp = (amount: PaymentAmountType) => {
    const toss_payment_amount_params: PaymentAmountType = {
      name: amount.name,
      currency: amount.currency,
      value: amount.value,
    };

    set_toss_payment_amount(toss_payment_amount_params);
    set_toss_payment_popup_show(true);
  };

  return (
    <div className="max-w-full px-[100px]">
      <div className="flex min-h-[300px] max-w-full items-center justify-center gap-[24px] overflow-x-auto rounded-xl border bg-[#1d1d1d] text-[#888888]">
        {!selected_category && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">Payment Category Not Selected!</p>
            <p className="">choose your payment category above</p>
          </div>
        )}
        {selected_category &&
          PRODUCT_SAMPLE.map((item, idx) => {
            const amount: PaymentAmountType = {
              name: item.name,
              currency: item.currency,
              value: item.price,
            };
            return (
              <div
                key={`${item.name}-${idx}`}
                className="flex h-[250px] w-[200px] flex-col justify-between border p-4"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-white">품명: {item.name}</p>
                  <p className="text-white">가격: {item.price}원</p>
                  <p className="text-white">통화: {item.currency}</p>
                </div>
                <Button
                  onClick={() => handleShowTossPaymentPopUp(amount)}
                  className="border bg-[#2d2d2d]"
                >
                  구매
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PaymentView;
