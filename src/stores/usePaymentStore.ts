import { create } from "zustand";

export type PaymentCategoryType =
  | "general"
  | "brandpay"
  | "subscribe"
  | "abroad";
export type PaymentAmountType = {
  name: string | null;
  currency: string | null;
  value: number | null;
};

interface PaymentStore {
  toss_payment_amount: PaymentAmountType;
  set_toss_payment_amount: (toss_payment_amount: PaymentAmountType) => void;

  toss_payment_popup_show: boolean;
  set_toss_payment_popup_show: (toss_popup_show: boolean) => void;

  selected_category: PaymentCategoryType | null;
  set_selected_category: (selected_category: PaymentCategoryType) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => {
  return {
    toss_payment_amount: { name: null, currency: null, value: null },
    set_toss_payment_amount(toss_payment_amount) {
      set({ toss_payment_amount });
    },

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
