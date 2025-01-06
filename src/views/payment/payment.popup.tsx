import { usePaymentStore } from "@/stores";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { useEffect, useRef } from "react";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "xzy3RQcPzKACw-glwChMt";

const PaymentPopUp = () => {
  const { selected_category, set_toss_payment_popup_show } = usePaymentStore();
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const price = 50_000;

  useEffect(() => {
    if (!selected_category) return;
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      paymentWidget.renderPaymentMethods("#payment-widget", price);
      paymentWidgetRef.current = paymentWidget;
    })();
  }, [selected_category]);

  const handleCloseTossPaymentPopUpClose = () => {
    set_toss_payment_popup_show(false);
    return;
  };

  return (
    <>
      {selected_category && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 */}
          <div className="absolute inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>

          {/* 팝업 */}
          <div className="relative z-50 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">결제</h2>
            <div id="payment-widget"></div>

            {/* 닫기 버튼 */}
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
              onClick={handleCloseTossPaymentPopUpClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPopUp;
