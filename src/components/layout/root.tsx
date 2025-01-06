import { usePaymentStore } from "@/stores";
import PaymentPopUp from "@/views/payment/payment.popup";
import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = () => {
  const { toss_payment_popup_show } = usePaymentStore();
  return (
    <main className="flex min-h-screen w-full flex-col bg-gray-50 text-gray-900">
      <div className="flex-1">
        <Outlet />
      </div>
      {/* Toss Payment PopUp */}
      {toss_payment_popup_show && <PaymentPopUp />}
    </main>
  );
};
