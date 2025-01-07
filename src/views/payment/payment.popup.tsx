// react
import { useEffect, useState } from "react";
// store
import { usePaymentStore } from "@/stores";
// module
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { v4 as uuidv4 } from "uuid";
// ui
import { Button } from "@/components/ui/button";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "xzy3RQcPzKACw-glwChMt";

const PaymentPopUp = () => {
  const {
    selected_category,
    toss_payment_amount,
    set_toss_payment_popup_show,
  } = usePaymentStore();

  // const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    if (!selected_category) return;

    (async () => {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    })();
  }, [selected_category]);

  useEffect(() => {
    (async () => {
      // 유효성 검증
      if (widgets === null || toss_payment_amount === null) {
        return;
      }

      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({
        currency: toss_payment_amount.currency!,
        value: toss_payment_amount.value!,
      });

      // ------ 결제 UI 및 약관 UI 렌더링 ------
      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    })();
  }, [toss_payment_amount, widgets]);

  const handlePaymentButtonClick = async () => {
    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장해야 함.
      await widgets?.requestPayment({
        orderId: uuidv4(),
        orderName: toss_payment_amount.name!,
        successUrl: window.location.origin + "/success",
        failUrl: window.location.origin + "/fail",
        customerEmail: "curstomer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseTossPaymentPopUpClose = () => {
    set_toss_payment_popup_show(false);
    return;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* 배경 */}
        <div className="absolute inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-md"></div>

        {/* 팝업 */}
        <div className="relative z-50 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          {(!toss_payment_amount ||
            Object.values(toss_payment_amount).some(
              (value) => value === null,
            )) && (
            <>
              <h2 className="mb-4 text-lg font-semibold">결제 정보 누락</h2>
              <p className="text-gray-600">
                결제 정보가 누락되었습니다. 다시 결제를 진행하세요.
              </p>
            </>
          )}

          {(toss_payment_amount ||
            Object.values(toss_payment_amount).some(
              (value) => value !== null,
            )) && (
            <>
              <div className="wrapper">
                <div className="box_section">
                  {/* 결제 UI */}
                  <div id="payment-method"></div>
                  {/* 이용약관 UI */}
                  <div id="agreement" />
                  {/* 결제하기 버튼 */}
                  <Button
                    className="button"
                    disabled={!ready}
                    onClick={handlePaymentButtonClick}
                  >
                    결제하기
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* 닫기 버튼 */}
          <button
            className="absolute right-4 top-2 text-gray-500 hover:text-gray-800"
            onClick={handleCloseTossPaymentPopUpClose}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPopUp;
