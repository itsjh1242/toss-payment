import { create } from "zustand";

export type payment_category = "general" | "brandpay" | "subscribe" | "abroad";
interface PaymentStore {
  toss_payment_popup_show: boolean;
  set_toss_payment_popup_show: (toss_popup_show: boolean) => void;

  selected_category: payment_category | null;
  set_selected_category: (selected_category: payment_category) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => {
  return {
    toss_payment_popup_show: false,
    set_toss_payment_popup_show(toss_payment_popup_show) {
      set({ toss_payment_popup_show });
    },

    selected_category: null,
    set_selected_category(selected_category) {
      set({ selected_category });
    },
  };
});
